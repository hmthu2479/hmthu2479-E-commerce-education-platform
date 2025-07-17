const express = require("express");
const { getCollection, setCollection } = require("../utils/jsonDb");
const productModel = require("../models/product")
const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  const products = await productModel.find();
  const { page = "1", limit = "9" } = req.query;
  const { q, category, price_gte, price_lte } = req.query;

  let filtered = products;

  function normalizeText(str) {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .toLowerCase();
  }

  if (q) {
    const rawKeywords = Array.isArray(q) ? q : [q];
    const keywords = rawKeywords.flatMap(
      (kw) => kw.toLowerCase().split(/\s+/) // tách theo dấu cách
    );

    filtered = filtered.filter((p) =>
      keywords.some((kw) => normalizeText(p.title).includes(kw))
    );
  }

  if (category) {
    const cats = Array.isArray(category) ? category : [category];
    filtered = filtered.filter((p) =>
      cats.some((cat) =>
        p.category.map((c) => c.toLowerCase()).includes(cat.toLowerCase())
      )
    );
  }

  if (price_gte || price_lte) {
    const gte = Array.isArray(price_gte) ? price_gte : [price_gte];
    const lte = Array.isArray(price_lte) ? price_lte : [price_lte];

    const priceRanges = [];

    for (let i = 0; i < Math.max(gte.length, lte.length); i++) {
      const min = parseInt(gte[i] ?? "0", 10);
      const max = parseInt(lte[i] ?? "100000000", 10);
      priceRanges.push([min, max]);
    }

    filtered = filtered.filter((p) =>
      priceRanges.some(([min, max]) => p.price >= min && p.price <= max)
    );
  }

  // Pagination
  if (req.query.page && req.query.limit) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    const paginatedProducts = filtered.slice(start, end);
    res.status(200).json({
      data: paginatedProducts,
      total: filtered.length,
      page: pageNum,
      totalPages: Math.ceil(filtered.length / limitNum),
    });
  } else {
    // Không có page/limit → trả toàn bộ (không phân trang)
    res.status(200).json(filtered);
  }

});
// POST /api/products
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const products = await productModel.insertMany(data);
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
