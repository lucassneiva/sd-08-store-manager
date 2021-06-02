const SalesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getsaleById = async (id) => {
  const sale = await SalesModel.getsaleById(id);
  return sale;
};

const addSale = async (productId, quantity) => {
  const sale = await SalesModel.addsale(productId, quantity);
  return sale;
};

const updateSale = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

const deleteSale = async (id) => {
  const sale = await SalesModel.deleteId(id);
  return sale;
};

module.exports = {
  getAllSales,
  getsaleById,
  addSale,
  updateSale,
  deleteSale,
};