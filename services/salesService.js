const salesModel = require('../models/salesModel');

const create = async (sales) => {
  const createdSales = await salesModel.createSales(sales);
  return createdSales.ops[0];
};

const getAllSales = async () => {
  const allSales = { sales: await salesModel.getAllSales() };
  return allSales;
};

const getSaleById = (id) => {
  return salesModel.getSaleById(id);
};

module.exports = {
  create,
  getAllSales,
  getSaleById,
};
