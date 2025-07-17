const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("History", historySchema);
