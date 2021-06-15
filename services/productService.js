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

const getProductById = (id) => {
  return productModel.getProductById(id);
};

const updateProduct = (id, name, quantity) => {
  return productModel.updateProduct(id, name, quantity);
};

const deleteProduct = (id) => {
  return productModel.deleteProduct(id);
}

module.exports = {
  create,
  deleteProduct,
  getAll,
  hasAnotherProductWithName,
  getProductById,
  updateProduct,
};
