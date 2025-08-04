const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: String,
  country: String,
});

module.exports = mongoose.model('Club', ClubSchema);
