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

const updateSale = async (id, sale) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const updatedSale = await SalesModel.updateSale(id, sale);
  return updatedSale;
};

module.exports = {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
