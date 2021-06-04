const salesModel = require('../models/salesModel');
const { ObjectId } = require('mongodb');

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

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
