const mongoose = require("mongoose");

const CompetitionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    league: { type: mongoose.Schema.Types.ObjectId, ref: "League" },
    teamCount: {
      type: Number,
      default: 0,
    },
    // grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Competition", CompetitionSchema);
