const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
});

module.exports = mongoose.model('Team', TeamSchema);
