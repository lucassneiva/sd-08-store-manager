const SalesModel = require('../models/salesModel');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const newSale = await SalesModel.createSale(sale);
  return newSale;
};

const listAllSales = async () => {
  const salesList = await SalesModel.listAllSales();
  return salesList;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const sale = await SalesModel.getSaleById(id);
  return sale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const deletedSaled = await SalesModel.deleteSale(id);
  return deleteSale;
};

module.exports = {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale
};
