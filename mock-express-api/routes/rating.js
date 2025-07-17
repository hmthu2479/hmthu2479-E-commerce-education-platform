const express = require("express");
const Rating = require("../models/rating");

const router = express.Router();

// GET /api/rating?productId=1
router.get("/", async (req, res) => {
  const { productId } = req.query;

  try {
    let ratings = [];

    if (productId) {
      const pid = parseInt(productId, 10);
      if (!isNaN(pid)) {
        ratings = await Rating.find({ productId: pid });
      }
    }

    const total = ratings.length;
    const average =
      total === 0
        ? 0
        : Math.round(
            (ratings.reduce((sum, r) => sum + (r.stars ?? 0), 0) / total) * 10
          ) / 10;

    res.status(200).json({
      ratings,
      total,
      average,
    });
  } catch (error) {
    console.error("GET /api/rating error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/", async (req, res) => {
  const data = req.body;

  const isValidRating = (r) =>
    typeof r.id === "number" &&
    typeof r.name === "string" &&
    typeof r.avatar === "string" &&
    typeof r.content === "string" &&
    typeof r.stars === "number" &&
    typeof r.date === "string" &&
    typeof r.productId === "number";

  try {
    // Nếu là 1 object duy nhất
    if (!Array.isArray(data)) {
      if (!isValidRating(data)) {
        return res.status(400).json({ error: "Invalid rating object" });
      }

      const exists = await Rating.findOne({ id: data.id });
      if (exists) {
        return res
          .status(409)
          .json({ error: "Rating with this id already exists" });
      }

      const created = await Rating.create(data);
      return res.status(201).json(created);
    }

    // Nếu là mảng nhiều object
    const validRatings = data.filter(isValidRating);
    if (validRatings.length !== data.length) {
      return res
        .status(400)
        .json({ error: "One or more rating items are invalid" });
    }

    // Loại bỏ các id đã tồn tại
    const existingIds = (
      await Rating.find(
        { id: { $in: validRatings.map((r) => r.id) } },
        { id: 1 }
      )
    ).map((r) => r.id);
    const toInsert = validRatings.filter((r) => !existingIds.includes(r.id));

    const inserted = await Rating.insertMany(toInsert);
    res.status(201).json({
      insertedCount: inserted.length,
      skipped: existingIds,
      inserted,
    });
  } catch (error) {
    console.error("POST /api/rating error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
