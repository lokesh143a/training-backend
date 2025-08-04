const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  roundNumber: Number,
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
  dateTime: Date,
  matchVideo: String, // URL or file path
  analystAssigned: { type: Boolean, default: false },
  status: { type: String, enum: ['Not Started', 'Ongoing', 'Completed'], default: 'Not Started' },
  qaStatus: { type: String, enum: ['Under QA', 'Approved', 'Rejected'], default: 'Under QA' }
});

module.exports = mongoose.model('Game', GameSchema);
