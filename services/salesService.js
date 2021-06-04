const SalesModel = require('../models/salesModel');

const createSale = async (sale) => {
  const newSale = await SalesModel.createSale(sale);
  return newSale;
};

module.exports = {
  createSale,
};
