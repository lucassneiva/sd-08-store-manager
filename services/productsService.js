const ProductModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const insertedProduct = await ProductModel.create(name, quantity);
  return insertedProduct;
};

const findByName = async (name) => {
  const productByName = await ProductModel.findByName(name);
};

module.exports = {
  create,
  findByName,
};