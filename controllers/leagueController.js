const League = require("../models/League");

const addLeague = async (req, res) => {
  try {
    const { name, country } = req.body;

    if (!name || !country)
      return res.status(400).json({ message: "All fields are required" });

    const newLeague = new League({
      name,
      country,
    });

    await newLeague.save();

    return res.status(201).json({ message: "League added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getLeague = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const totalLeagues = await League.countDocuments();

    const leagues = await League.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Leagues fetched successfully",
      page,
      limit,
      total: totalLeagues,
      totalPages: Math.ceil(totalLeagues / limit),
      data: leagues,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leagues",
      error: error.message,
    });
  }
};

const editLeague = async (req, res) => {
  try {
    const { id, name, country } = req.body;

    if (!id || !name || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isExisted = await League.findById(id);
    if (!isExisted) {
      return res.status(400).json({ message: "League not found" });
    }

    isExisted.name = name;
    isExisted.country = country;

    await isExisted.save();

    return res.status(200).json({ message: "League updated successfully" });
  } catch (error) {
    console.error("Error updating league:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteLeague = async (req, res) => {
  try {
    const { id } = req.body;

    const isExisted = await League.findById(id);
    if (!isExisted)
      return res.status(400).json({ message: "League not found" });

    await League.findByIdAndDelete(id);

    return res.status(200).json({ message: "League deleted successfully!" });
  } catch (error) {
    console.error("Error deleting league:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting league" });
  }
};

module.exports = { addLeague, getLeague, editLeague, deleteLeague };
