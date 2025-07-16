const express = require("express");
const { getCollection } = require("../utils/jsonDb");

const router = express.Router();

// GET /api/rating?productId=1
router.get("/", (req, res) => {
  const products = getCollection("products");
  const allRatings = getCollection("rating"); // rating nằm riêng

  const { productId } = req.query;
  let ratings = [];

  if (productId) {
    const pid = parseInt(productId, 10);
    const product = products.find((p) => p.id === pid);

    if (product && Array.isArray(product.ratingIds)) {
      ratings = allRatings.filter((r) => product.ratingIds.includes(r.id));
    }
  }

  const calculateRatingStats = (ratings = []) => {
    const total = ratings.length;
    const average =
      total === 0
        ? 0
        : Math.round(
            (ratings.reduce((sum, r) => sum + (r.stars ?? 0), 0) / total) * 10
          ) / 10;

    return { total, average };
  };

  const stats = calculateRatingStats(ratings);

  res.status(200).json({
    ratings,
    ...stats,
  });
});

module.exports = router;
