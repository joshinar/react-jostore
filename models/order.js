const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
  name: {
    type: String,
    required: true
  },
  products: {
    type: {},
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
