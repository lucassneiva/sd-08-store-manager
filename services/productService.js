const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const { ops } = await productModel.create(name, quantity);
  return ops[0];
};

const hasProduct = async (name) => {
  return await productModel.getProductByName(name) !== null;
};

const getAll = async () => {
  return {
    products: [...await productModel.getAll()],
  };
};

const getProductById = async (id) => {
  return productModel.getProductById(id);
};

const updateProduct = async (id, name, quantity) => {
  return productModel.updateProduct(id, name, quantity);
};

module.exports = {
  create,
  hasProduct,
  getAll,
  getProductById,
  updateProduct,
};
