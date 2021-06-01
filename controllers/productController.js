const productModel = require('../models/productModel');

const HTTP_STATUS_OK = 200;
const INTERNAL_ERROR = 500;
const UPDATE_STATUS = 201;

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(HTTP_STATUS_OK).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productModel.addProduct(name, quantity);

    res.status(UPDATE_STATUS).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct
};