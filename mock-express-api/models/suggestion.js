const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

const suggestionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  words: {
    type: [wordSchema],
    default: [],
  },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
