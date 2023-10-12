const Product = require("../models/products.js");

exports.getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    // let sortfix = sort.replace(",", " ");
    let sortfix = sort.split(",").join(" ");
    apiData = apiData.sort(sortfix);
    // queryObject.sort = sortfix
  }

  if (select) {
    let selectfix = select.split(",").join(" ");
    apiData = apiData.select(selectfix);
  }

  // Pagination
  let page = Number(req.query.page) || 1;
  let limit = (req.query = Number(req.query.limit) || 10);
  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  // console.log(queryObject);

  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};

exports.getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query);
  res.status(200).json({ myData });
};
