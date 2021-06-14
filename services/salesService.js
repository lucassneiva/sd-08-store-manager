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

const deleteSale = async (id) => {
  const sale = await salesModel.getSalesById(id);
  if(sale instanceof Error) return sale;
  return salesModel.deleteSale(id).then(() => sale);
};

module.exports = {
  addSale,
  deleteSale
};