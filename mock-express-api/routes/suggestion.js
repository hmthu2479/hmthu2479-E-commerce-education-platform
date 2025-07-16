const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET /api/suggestion?userId=u1
router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const db = readDb();
  const products = db.products || [];

  const userFavorites = db.favorites?.filter((f) => f.userId === userId) || [];
  const userHistories = db.histories?.filter((h) => h.userId === userId) || [];

  const seenProductIds = new Set([
    ...userFavorites.map((f) => f.productId),
    ...userHistories.map((h) => h.productId),
  ]);

  const wordCounts = {};

  const collectWords = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.title) return;

    const words = product.title
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);
    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  };

  userFavorites.forEach((f) => collectWords(f.productId));
  userHistories.forEach((h) => collectWords(h.productId));

  const sortedWords = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Cập nhật gợi ý từ từ khóa
  const updatedSuggestion = { userId, words: sortedWords };
  db.suggestions = db.suggestions || [];
  const existingIndex = db.suggestions.findIndex((s) => s.userId === userId);

  if (existingIndex >= 0) {
    db.suggestions[existingIndex] = updatedSuggestion;
  } else {
    db.suggestions.push(updatedSuggestion);
  }

  // Bước 1: lọc theo từ khóa
  const suggestedProducts = products.filter((p) => {
    const titleWords = p.title?.toLowerCase().split(/\s+/) || [];
    const hasMatch = sortedWords.some((s) => titleWords.includes(s.word));
    return hasMatch && !seenProductIds.has(p.id);
  });

  // Bước 2: Nếu chưa đủ 6 sản phẩm → random thêm
  const missingCount = 6 - suggestedProducts.length;
  if (missingCount > 0) {
    const remainingProducts = products.filter(
      (p) =>
        !seenProductIds.has(p.id) &&
        !suggestedProducts.some((sp) => sp.id === p.id)
    );

    // Shuffle mảng và lấy random
    for (let i = remainingProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingProducts[i], remainingProducts[j]] = [
        remainingProducts[j],
        remainingProducts[i],
      ];
    }

    const randomFill = remainingProducts.slice(0, missingCount);
    suggestedProducts.push(...randomFill);
  }

  writeDb(db);

  return res.status(200).json(suggestedProducts.map((p) => p.id));
});

module.exports = router;
