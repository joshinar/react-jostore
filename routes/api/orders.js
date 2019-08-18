const express = require("express");
const router = express.Router();
const Seller = require("../../models/seller");
const Product = require("../../models/product");
const auth = require("../../middleware/auth");

const Order = require("../../models/order");

router.post("/item-cusinfo", async (req, res) => {
  try {
    const newOrder = await new Order(req.body);

    await newOrder.save();
    res.json("Order placed succesfully");
  } catch (error) {
    res.status(500).json("server error");
  }
});

// get orders of a seller
router.get("/api/all-orders/me", async (req, res) => {
  try {
    const orders = await Order.find({
      "products.seller": "5d120fa588f5b72e3c87f024"
    });
    const products = [];
    orders.forEach(order => {
      products.push(order.pro);
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
