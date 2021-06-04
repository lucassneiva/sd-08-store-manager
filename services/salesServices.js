const salesModel = require('../models/salesModel');
const { ObjectId, ObjectID } = require('mongodb');

const createSale = async (itemSale) => {
  const product = await salesModel.createSale(itemSale);
  return product;
};

const getAllSales = async () => {
  const product = await salesModel.getAllSales();
  return product;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const sale = await salesModel.getSaleById(id);

  return sale;
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
  deleteSale,
};
