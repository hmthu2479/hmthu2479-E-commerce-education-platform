// models/cartItem.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartItemSchema);
