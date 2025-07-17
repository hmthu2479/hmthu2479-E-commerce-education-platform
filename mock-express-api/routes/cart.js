const express = require("express");
const productModel = require("../models/product");
const cartModel = require("../models/cart");

const router = express.Router();

// GET /api/cart?userId=abc
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const userCart = await cartModel.find({ userId }).populate("productId"); // 👈 load thông tin chi tiết product
  return res.status(200).json(userCart);
});

// POST /api/cart
// body: { userId, productId }
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  const pid = parseInt(productId, 10);
  if (!userId || !pid)
    return res
      .status(400)
      .json({ error: "Missing or invalid userId/productId" });

  const existing = await cartModel.findOne({ userId, itemId: pid });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.status(200).json(existing);
  }

  const product = await productModel.findOne({ id: pid });
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cartItem = new cartModel({
    userId,
    itemId: product.id,
    productId: product._id, // để populate chi tiết
    quantity: 1,
  });

  await cartItem.save();
  return res.status(201).json(cartItem);
});

// PATCH /api/cart/:id
// body: { userId, quantity }
router.patch("/:id", async (req, res) => {
  const { userId, quantity } = req.body;
  const pid = parseInt(req.params.id, 10);
  if (!userId || !pid || typeof quantity !== "number" || quantity < 1) {
    return res
      .status(400)
      .json({ error: "Invalid or missing userId/productId/quantity" });
  }

  const item = await cartModel.findOne({ userId, itemId: pid });
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.quantity = quantity;
  await item.save();
  return res.status(200).json(item);
});

// DELETE /api/cart/:id?userId=abc
router.delete("/:id", async (req, res) => {
  const { userId } = req.query;
  const pid = parseInt(req.params.id, 10);
  if (!userId || !pid)
    return res
      .status(400)
      .json({ error: "Missing userId or invalid productId" });

  const result = await cartModel.findOneAndDelete({ userId, itemId: pid });
  if (!result) return res.status(404).json({ error: "Item not found" });

  return res.status(200).json({ success: true });
});

module.exports = router;
