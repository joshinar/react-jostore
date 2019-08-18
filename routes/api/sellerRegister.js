const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Seller = require("../../models/seller");
const sgMail = require("@sendgrid/mail");
const accountSid = "AC84fe748be4d2fb149f56993eaa64b21b";
const authToken = "cbc0121d7c3d6ccee7c8633511912f9e";
const client = require("twilio")(accountSid, authToken);

router.post(
  "/api/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "please enter a password with 6 or more chars").isLength({
      min: 6
    }),
    check("phone", "Enter a valid phone number")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, password } = req.body;
    try {
      // Search if seller already exists
      let seller = await Seller.findOne({ email });

      if (seller) {
        return res.status(400).json({ error: "Email already taken" });
      }

      //  Create a seller Instance
      seller = await new Seller(req.body);

      //   Encrypt password

      const salt = await bcrypt.genSalt(10);
      seller.password = await bcrypt.hash(password, salt);
      await seller.save();

      //   Generate token
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
      // Send email
      sgMail.setApiKey(config.get("SENDGRID_API_KEY"));
      const msg = {
        to: email,
        from: "narenk70@gmail.com",
        subject: "Welcome",
        text: `Hello ${name}, Thank you so much for joining us and becoming a member of our ever growing organisation`
      };
      sgMail.send(msg);
      // send sms
      client.messages
        .create({
          body: "Test sms from twilio",
          from: "+12019044176",
          to: phone
        })
        .then(message => console.log(message.sid));
    } catch (error) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
