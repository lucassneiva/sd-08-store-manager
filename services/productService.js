const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const { ops } = await productModel.create(name, quantity);
  return ops[0];
};

const hasAnotherProductWithName = async (name, id = null) => {
  const product = await productModel.getProductByName(name);
  if (id && product && product['_id'].toString() === id) {
    return false;
  }

  return product !== null;
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
  hasAnotherProductWithName,
  getAll,
  getProductById,
  updateProduct,
};
