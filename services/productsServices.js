const { productsModel } = require('../models');

const readProducts = async () => {
  const data = await productsModel.read();
  return data;
};

const createProduct = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);
  return { _id: newProduct.insertedId, name, quantity };
};

module.exports = {
  createProduct,
  readProducts,
};
