const express = require("express");
const Product = require("../models/product");
const Favorite = require("../models/favorite");
const History = require("../models/history");
const Suggestion = require("../models/suggestion");

const router = express.Router();

// GET /api/suggestion?userId=abc
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const products = await Product.find({ userId: { $exists: false } });

    const favorites = await Favorite.find({ userId });
    const histories = await History.find({ userId });

    const seenProductIds = new Set([
      ...favorites.map((f) => f.productId),
      ...histories.map((h) => h.productId),
    ]);

    const wordCounts = {};

    const collectWords = (productId) => {
      const product = products.find((p) => p.id === productId);
      if (!product?.title) return;

      const words = product.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    };

    favorites.forEach((f) => collectWords(f.productId));
    histories.forEach((h) => collectWords(h.productId));

    const sortedWords = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Ghi suggestion vào DB
    await Suggestion.findOneAndUpdate(
      { userId },
      { $set: { words: sortedWords } },
      { upsert: true, new: true }
    );

    // B1: lọc theo từ khóa
    const suggestedProducts = products.filter((p) => {
      const titleWords = p.title?.toLowerCase().split(/\s+/) || [];
      const hasMatch = sortedWords.some((s) => titleWords.includes(s.word));
      return hasMatch && !seenProductIds.has(p.id);
    });

    // B2: nếu chưa đủ 6 → thêm random
    const missingCount = 6 - suggestedProducts.length;
    if (missingCount > 0) {
      const remainingProducts = products.filter(
        (p) =>
          !seenProductIds.has(p.id) &&
          !suggestedProducts.some((sp) => sp.id === p.id)
      );

      for (let i = remainingProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingProducts[i], remainingProducts[j]] = [remainingProducts[j], remainingProducts[i]];
      }

      suggestedProducts.push(...remainingProducts.slice(0, missingCount));
    }

    res.status(200).json(suggestedProducts.map((p) => p.id));
  } catch (err) {
    console.error("Error in /api/suggestion:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
