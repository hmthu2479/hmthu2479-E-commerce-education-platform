const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  ratingIds: {
    type: [Number],
    default: [],
  },
  avatar: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  }, 

});

module.exports = mongoose.model("Product", productSchema);
