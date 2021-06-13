const salesModel = require('../models/salesModel');
const { getProductById } = require('./productsService');

const addSale = async (products) => {
  const checkProducts = products
    .map(({ productId }) => product = getProductById(productId));
  const results = await Promise.all(checkProducts);
  if (results.some((result) => result instanceof Error)) {
    return new Error();
  }
  return salesModel.addSale(products);
};

module.exports = {
  addSale
};