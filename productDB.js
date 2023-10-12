const connectDB = require("./db/connect.js");
const Product = require("./models/products.js");
require("dotenv").config();

const ProductJson = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("SuccessFully")
  } catch (error) {
    console.log(error);
  }
};

start();
