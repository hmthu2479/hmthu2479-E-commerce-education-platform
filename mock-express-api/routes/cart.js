const express = require("express");
const { getCollection, setCollection } = require("../utils/jsonDb");

const router = express.Router();

// GET /api/cart?userId=abc
router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const items = getCollection("items") || [];
  const userCart = items.filter((item) => item.userId === userId);
  return res.status(200).json(userCart);
});

// POST /api/cart
// body: { userId, productId }
router.post("/", (req, res) => {
  const { userId, productId } = req.body;
  const pid = parseInt(productId, 10);

  if (!userId || !pid)
    return res
      .status(400)
      .json({ error: "Missing or invalid userId/productId" });

  const items = getCollection("items") || [];

  const existing = items.find(
    (item) => item.userId === userId && Number(item.itemId) === pid
  );

  if (existing) {
    existing.quantity += 1;
    setCollection("items", items);
    return res.status(200).json(existing);
  }

  const products = getCollection("products") || [];
  const product = products.find((p) => p.id === pid);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const newItem = {
    ...product,
    itemId: product.id, // nếu bạn cần dùng riêng
    userId,
    quantity: 1,
  };

  items.push(newItem);
  setCollection("items", items);
  return res.status(201).json(newItem);
});

// PATCH /api/cart/:id
// body: { userId, quantity }
router.patch("/:id", (req, res) => {
  const { userId, quantity } = req.body;
  const pid = parseInt(req.params.id, 10);

  if (!userId || !pid || typeof quantity !== "number" || quantity < 1) {
    return res
      .status(400)
      .json({ error: "Invalid or missing userId/productId/quantity" });
  }

  const items = getCollection("items") || [];

  const item = items.find(
    (item) => item.userId === userId && item.itemId === pid
  );

  if (item) {
    item.quantity = quantity;
    setCollection("items", items);
    return res.status(200).json(item);
  } else {
    return res.status(404).json({ error: "Item not found" });
  }
});

// DELETE /api/cart/:id?userId=abc
router.delete("/:id", (req, res) => {
  const { userId } = req.query;
  const pid = parseInt(req.params.id, 10);

  if (!userId || !pid)
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });

  let items = getCollection("items") || [];
  const originalLength = items.length;

  items = items.filter(
    (item) => !(item.userId === userId && item.itemId === pid)
  );

  if (items.length === originalLength) {
    return res.status(404).json({ error: "Item not found" });
  }

  setCollection("items", items);
  return res.status(200).json({ success: true });
});

module.exports = router;
