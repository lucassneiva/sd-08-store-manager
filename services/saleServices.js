const SalesModel = require('../models/salesModel');
const { generateError, errorMsgs } = require('./errors');

const {wrongIdOrQuantity} = errorMsgs;

const addSales = async(sale) => {

  if (sale.find(product => product.quantity < 1)) {
    return generateError(wrongIdOrQuantity);
  }

  if (sale.find(product => typeof product.quantity === 'string')) {
    return generateError(wrongIdOrQuantity);
  }

  const added = await SalesModel.addSale(sale);

  return added.ops[0];
};

module.exports = {
  addSales,
};
