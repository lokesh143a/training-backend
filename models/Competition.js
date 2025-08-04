const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
  name: String,
  league: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
  teamCount: Number,
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
});

module.exports = mongoose.model('Competition', CompetitionSchema);
