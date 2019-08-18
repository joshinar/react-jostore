const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Store = require("../../models/store");

// get all stores
router.get("/stores", async (req, res) => {
  try {
    const stores = await Store.find();
    return res.json(stores);
  } catch (err) {
    res.status(500).json("server error");
  }
});

// Get current logged in user stores

router.get("/api/stores/me", auth, async (req, res) => {
  try {
    const stores = await Store.find({ seller: req.seller.id });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Create store route
router.post(
  "/api/new-store",
  [
    auth,
    [
      check("name", "Store name is required")
        .not()
        .isEmpty(),
      check("image", "Please include image link")
        .not()
        .isEmpty(),
      check("city", "City name is required")
        .not()
        .isEmpty(),
      check("country", "Country is required")
        .not()
        .isEmpty(),
      check("dealsIn", "specify what you deal in (Ex:'mens wear','kids wear')")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, image, city, country, dealsIn } = req.body;
    try {
      const newStore = {
        name,
        image,
        city,
        country,
        dealsIn,
        seller: req.seller.id
      };

      let store = await new Store(newStore);
      await store.save();
      res.json({ store });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete a store route

router.delete("/api/remove-store/:id", auth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (store.seller.toString() !== req.seller.id) {
      return res
        .status(401)
        .json("Not authorized to delete other seller's store/s");
    }
    await store.remove();
    res.json("Store removed successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
