const express = require("express");
const History = require("../models/history");

const router = express.Router();

// GET /api/history?userId=abc
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const histories = await History.find({ userId });
    const productIds = histories.map((h) => h.productId);
    res.status(200).json(productIds);
  } catch (error) {
    console.error("GET /api/history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/history
// body: { userId, productId }
router.post("/", async (req, res) => {
  console.log("🔔 Received POST /api/history body:", req.body); // ✅ log ở đây

  const { userId, productId } = req.body;
  const productIdNum = parseInt(productId, 10);

  if (!userId || isNaN(productIdNum)) {
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });
  }

  try {
    const exists = await History.findOne({ userId, productId });
    if (!exists) {
      await History.create({ userId, productId });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ POST /api/history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
