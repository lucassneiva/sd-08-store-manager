const salesModel = require('../models/salesModel');
// const { ObjectId } = require('mongodb');

const createSale = async (itemSale) => {
  const product = await salesModel.createSale(itemSale);
  return product;
};

const getAllSales = async () => {
  const product = await salesModel.getAllSales();
  return product;
};

module.exports = {
  createSale,
  getAllSales,
};
