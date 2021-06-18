const productModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

module.exports = { getAll };
