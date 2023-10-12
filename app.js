require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");

// router creation
const products_routes = require("./routes/product.js");

const PORT = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Hi, I am live");
});

// middleware or routers
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`${PORT} is running`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
