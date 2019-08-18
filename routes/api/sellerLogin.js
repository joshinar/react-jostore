const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Seller = require("../../models/seller");

// get logged in user

router.get("/api/login", auth, async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller.id).select("-password");
    res.send(seller);
  } catch (err) {
    res.status(500).send("server error");
  }
});

// seller login route
router.post(
  "/api/login",
  [
    check("email", "Enter your registered email").isEmail(),
    check("password", "Please enter password")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // check if seller exists
      const seller = await Seller.findOne({ email });
      if (!seller) {
        res.status(400).json({ error: "Invalid credentials" });
      }
      //   Compare password
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      }
      const payload = {
        seller: {
          id: seller.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
