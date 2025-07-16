const express = require("express");
const { getCollection, setCollection } = require("../utils/jsonDb");

const router = express.Router();

// GET /api/favourite?userId=abc
router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const favorites = getCollection("favourites") || [];

  const userFavorites = favorites.filter((f) => f.userId === userId);
  res.status(200).json(userFavorites.map((f) => f.productId));
});


// POST /api/favourite
// body: { userId, productId }
router.post("/", (req, res) => {
  const { userId, productId } = req.body;
  const productIdNum = parseInt(productId, 10);

  if (!userId || !productIdNum)
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });

  let favourite = getCollection("favourites") || [];

  const exists = favourite.find(
    (f) => f.userId === userId && f.productId === productIdNum
  );

  if (exists) {
    // Bỏ yêu thích
    favourite = favourite.filter(
      (f) => !(f.userId === userId && f.productId === productIdNum)
    );
  } else {
    // Thêm yêu thích
    favourite.push({ userId, productId: productIdNum });
  }

  setCollection("favourites", favourite);
  res.status(200).json({ success: true });
});

module.exports = router;
