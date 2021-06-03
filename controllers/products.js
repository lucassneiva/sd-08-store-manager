const productsModel = require('../models/products');
const productsService = require('../services/products');
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const INVALID_DATA_STATUS = 422;

const getProducts = async (req, res) => {
  const products = await productsModel.getProducts();
  return res.status(OK_STATUS).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const isValid = await productsService.isValid(name, quantity);
  if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);

  return res.status(CREATED_STATUS).json(isValid);
};

module.exports = {
  getProducts,
  createProduct,
};
