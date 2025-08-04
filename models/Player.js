const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  jerseyNumber: Number,
  numberOfGamesPlayed: Number,
});

module.exports = mongoose.model('Player', PlayerSchema);
