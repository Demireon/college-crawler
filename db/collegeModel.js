const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
  collegeBoardCode: String,
});

const College = mongoose.model('College', collegeSchema);

module.exports = College; // Export the model directly