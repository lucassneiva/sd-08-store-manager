// Service faz conexão com o model, sendo utilizado pelo controller, geralmente aqui ficam os ifs
const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllTheProducts();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const createProduct = async (name, quantity) => {
  const product = await productsModel.addProductToDB(name, quantity);
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
  getAllProducts,
  createProduct,
  getById,
  updateById,
  deleteById,
};
