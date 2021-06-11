const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const { ops } = await productModel.create(name, quantity);
  return ops[0];
};

const hasProduct = async (name) => {
  return await productModel.getProductByName(name) !== null;
};

module.exports = {
  create,
  hasProduct,
};
