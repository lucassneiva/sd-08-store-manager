const productsModel = require('../models/products');
const productsService = require('../services/products');
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const INVALID_DATA_STATUS = 422;

const getProducts = async (req, res) => {
  const products = await productsModel.getProducts();
  return res.status(OK_STATUS).json({products});
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const isValid = await productsService.userIsValid(name, quantity);
  if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);
  const newProduct = await productsModel.createProduct(isValid.name, isValid.quantity);

  return res.status(CREATED_STATUS).json(newProduct);
};

const findProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.idIsValid(id);
  if(product.err) return res.status(INVALID_DATA_STATUS).json(product);

  return res.status(OK_STATUS).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const isValid = await productsService.userIsValid(name, quantity);
  if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);
  const editedProduct = await productsModel.updateProduct(id, name, quantity);
  
  return res.status(OK_STATUS).json(editedProduct);
};

module.exports = {
  getProducts,
  createProduct,
  findProduct,
  updateProduct
};
