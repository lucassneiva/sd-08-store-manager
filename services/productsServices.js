const { ObjectID } = require('mongodb');
const { productsModel } = require('../models');

const readProducts = async () => {
  const data = await productsModel.read();
  return data;
};

const createProduct = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);
  return { _id: newProduct.insertedId, name, quantity };
};

const readProductsById = async (id) => {
  const product = await productsModel.readId(id);
  return product;
};

module.exports = {
  createProduct,
  readProducts,
  readProductsById,
};
