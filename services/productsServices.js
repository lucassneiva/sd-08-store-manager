const productsModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {

  const product = await productsModel.createProduct(name, quantity);
  return product;
};

const getAllProduct = async () => {
  const product = await productsModel.getAllProducts();
  return product;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const product = await productsModel.getProductById(id);
  return product;
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
};
