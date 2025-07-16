const express = require("express");
const { getCollection, setCollection } = require("../utils/jsonDb");

const router = express.Router();

// GET /api/history?userId=abc
router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const histories = getCollection("histories") || [];
  const userHistories = histories.filter((f) => f.userId === userId);
  return res.status(200).json(userHistories.map((f) => f.productId));
});

// POST /api/history
// body: { userId, productId }
router.post("/", (req, res) => {
  const { userId, productId } = req.body;
  const productIdNum = parseInt(productId, 10);

  if (!userId || !productIdNum)
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });

  let history = getCollection("histories") || [];

  const exists = history.find(
    (f) => f.userId === userId && f.productId === productIdNum
  );

  if (!exists) {
    history.push({ userId, productId: productIdNum }); // 👈 ghi mới vào lịch sử
  }

  setCollection("histories", history);
  res.status(200).json({ success: true });
});


module.exports = router;
