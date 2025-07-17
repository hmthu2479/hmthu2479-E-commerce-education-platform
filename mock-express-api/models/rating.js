const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  productId: {
    type: Number, 
    required: true,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
