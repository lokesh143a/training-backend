const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    numberOfCompetitions: {
      type: Number,
      default: 0,
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("League", LeagueSchema);
