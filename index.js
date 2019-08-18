const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const registerRouter = require("./routes/api/sellerRegister");
const loginRouter = require("./routes/api/sellerLogin");
const storeRouter = require("./routes/api/stores");
const productRouter = require("./routes/api/products");
const orderRouter = require("./routes/api/orders");

const app = express();

// Connect to Database
connectDB();

// Init express middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(storeRouter);
app.use(productRouter);
app.use(orderRouter);

// // serve static assets
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
