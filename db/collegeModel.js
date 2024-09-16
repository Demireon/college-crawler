const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  collegeBoardCode: { type: String },
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
