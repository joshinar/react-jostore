const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to Database");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
