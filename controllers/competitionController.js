const mongoose = require("mongoose");
const Competition = require("../models/Competition");
const League = require("../models/League");

// CREATE
const createCompetition = async (req, res) => {
  try {
    const { name, league, grade } = req.body;

    if (!name || !league ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCompetition = new Competition({
      name,
      league,
      grade,
    });

    await newCompetition.save();

    // Increment the numberOfCompetitions in the league
    await League.findByIdAndUpdate(league, {
      $inc: { numberOfCompetitions: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Competition created successfully!",
    });
  } catch (error) {
    console.error("Error creating competition:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET
const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find()
      .populate("league", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: competitions,
      message: "Competitions fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch competitions",
      error: error.message,
    });
  }
};

// UPDATE
const updateCompetition = async (req, res) => {
  try {
    const { id, name, league, grade } = req.body;

    if (!id || !name || !league ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid competition ID" });
    }

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    const oldLeague = competition.league.toString();

    // Update fields
    competition.name = name;
    competition.league = league;
    competition.grade = grade;

    await competition.save();

    // If league has changed, adjust competition count
    if (oldLeague !== league) {
      await League.findByIdAndUpdate(oldLeague, {
        $inc: { numberOfCompetitions: -1 },
      });

      await League.findByIdAndUpdate(league, {
        $inc: { numberOfCompetitions: 1 },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Competition updated successfully",
      competition,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// DELETE
const deleteCompetition = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Competition ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid competition ID" });
    }

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    // 1. Delete the competition
    await Competition.findByIdAndDelete(id);
    // 2. Decrement the numberOfCompetitions in the related league
    await League.findByIdAndUpdate(competition.league, {
      $inc: { numberOfCompetitions: -1 },
    });

    return res.status(200).json({
      success: true,
      message: "Competition deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const updateCompetitionStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "ID and status are required" });
    }

    if (!["Ongoing", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    competition.status = status;
    await competition.save();

    return res.status(200).json({
      success: true,
      message: "Competition status updated successfully",
      data: competition,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};


module.exports = {
  createCompetition,
  getCompetitions,
  updateCompetition,
  deleteCompetition,
  updateCompetitionStatus
};
