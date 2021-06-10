// Service faz conexão com o model
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const createProduct = async (name, quantity) => {
  const findByName = await productsModel.findProductByName(name);
  if (findByName) return null;
  const product = await productsModel.addProduct(name, quantity);
  return product;
};

const updateById = async (id, updatedProduct) => {
  const product = await productsModel.updateOrCreateProduct(id, updatedProduct);
  return product;
};

const deleteById = async (id) => {
  const deletedProduct = await productsModel.getProductById(id);
  await productsModel.deleteUsingId(id);
  return (deletedProduct);
};

module.exports = {
  getAll,
  createProduct,
  getById,
  updateById,
  deleteById,
};
