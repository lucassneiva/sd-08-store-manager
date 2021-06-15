const salesModel = require('../models/salesModel');

const create = async (sales) => {
  const createdSales = await salesModel.createSales(sales);
  return createdSales.ops[0];
};

module.exports = {
  create,
};
