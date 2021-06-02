const ProductsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);
  return product;
};

const addProduct = async (name, quantity) => {
  const product = await ProductsModel.addProduct(name, quantity);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await ProductsModel.updateProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const product = await ProductsModel.excludeProduct(id);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
