const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller"
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  wear: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
