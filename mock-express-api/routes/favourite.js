const express = require("express");
const favoriteModel = require("../models/favorite");
const router = express.Router();

// GET /api/favourite?userId=abc
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const favorites = await favoriteModel.find({ userId });
  const productIds = favorites.map((f) => f.productId);

  res.status(200).json(productIds);
});

// POST /api/favourite
// body: { userId, productId }
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  const productIdNum = parseInt(productId, 10);

  if (!userId || !productIdNum)
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });

  const existing = await favoriteModel.findOne({ userId, productId: productIdNum });

  if (existing) {
    // Nếu đã có → xóa (bỏ yêu thích)
    await favoriteModel.deleteOne({ _id: existing._id });
    return res.status(200).json({ message: "Removed from favorites" });
  } else {
    // Nếu chưa có → thêm
    const newFavorite = await favoriteModel.create({ userId, productId: productIdNum });
    return res.status(201).json(newFavorite);
  }
});

module.exports = router;
