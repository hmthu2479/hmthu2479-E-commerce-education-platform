const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
