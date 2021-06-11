const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const { ops } = await productModel.create(name, quantity);
  return ops[0];
};

module.exports = {
  create,
};
