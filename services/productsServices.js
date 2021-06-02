const productsModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const product = await productsModel.createProduct(name, quantity);
  return product;
};

const getAllProduct = async () => {
  const product = await productsModel.getAllProducts();
  return product;
};



module.exports = {
  createProduct,
  getAllProduct,
};
