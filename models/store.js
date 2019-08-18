const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller"
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  dealsIn: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Store = mongoose.model("store", storeSchema);

module.exports = Store;
