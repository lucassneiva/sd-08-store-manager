const SalesModel = require('../Model/SalesModel');

const createSale = async (name, quantity) => {
  const result = await SalesModel.createSale(name, quantity);

  return result;
};

const getAllSales = async () => {};

const getOneSale = async () => {};

const updateSale = async () => {};

const deleteSale = async () => {};

module.exports = { createSale, getAllSales, getOneSale, updateSale, deleteSale };
