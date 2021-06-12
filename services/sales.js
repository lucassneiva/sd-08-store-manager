const salesModel = require('../models/sales.js');

const addNewSale = async (itensSold) => {
  const result = await salesModel.addNewSale(itensSold);
  return result;
};

const getAllSales = async () => {
  const result = await salesModel.getAllsales();
  return result;
};


const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

module.exports = {
  addNewSale,
  getAllSales,
  getById,
};
