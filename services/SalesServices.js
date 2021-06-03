const SalesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getsaleById = async (id) => {
  const sale = await SalesModel.getsaleById(id);
  return sale;
};

const addSales = async (itensSold) => {
  const sale = await SalesModel.addSale(itensSold);
  return sale;
};

const updateSale = async (id) => {
  const sale = await SalesModel.update(id);
  return sale;
};

const deleteSale = async (id) => {
  const sale = await SalesModel.deleteId(id);
  return sale;
};

module.exports = {
  getAllSales,
  getsaleById,
  addSales,
  updateSale,
  deleteSale,
};