const salesModel = require('../models/salesModel');
const { ObjectId, ObjectID } = require('mongodb');

const createSale = async (itemSale) => {
  const sale = await salesModel.createSale(itemSale);
  return sale;
};

const getAllSales = async () => {
  const sale = await salesModel.getAllSales();
  return sale;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const sale = await salesModel.getSaleById(id);

  return sale;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const newSale = await salesModel.updateSale(id, itensSold);

  return newSale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const deletedSales = await salesModel.deleteSale(id);
  return deletedSales;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
