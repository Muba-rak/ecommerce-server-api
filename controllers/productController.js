const Product = require("../models/Product");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};
const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  res.status(200).json(product);
};
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(product);
};
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  await product.deleteOne();
  res.status(200).json({ msg: "success, product removed" });
};
const uploadImage = async (req, res) => {
  res.send("uploade image Product");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
