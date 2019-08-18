const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Product = require("../../models/product");

// Get all products of a particular store
router.get("/api/products/:store", async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.store });
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get products of logged in seller
router.get("/api/all-products/me", auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller.id });
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single product
router.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Create/update a Product
router.post(
  "/api/add-product",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "description is required")
        .not()
        .isEmpty(),
      check("price", "price is required").isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, image, price, wear } = req.body;
    try {
      const newProduct = {
        title,
        description,
        image,
        price,
        wear,
        seller: req.seller.id
      };

      let product = await Product.findOne({ title });
      if (product) {
        if (product.seller.toString() !== req.seller.id) {
          return res.status(400).json({
            error: "Not authorized to update/delete other seller's product/s"
          });
        }
        await Product.findOneAndUpdate(title, newProduct);
        return res.json(product);
      }
      product = await new Product(newProduct);
      await product.save();
      res.json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server error");
    }
  }
);

// Delete a product
router.delete("/api/product/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.seller.toString() !== req.seller.id) {
      return res.status(400).json({
        error: "Not authorized to update/delete other seller's product/s"
      });
    }
    await product.remove();
    res.json({ msg: "Product removed sucesssfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
