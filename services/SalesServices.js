const SalesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await SalesModel.getSaleById(id);
  return sale;
};

const addSales = async (itensSold) => {
  const sale = await SalesModel.addSale(itensSold);
  return sale;
};

const updateSale = async (id, sales) => {
  const sale = await SalesModel.update(id, sales);
  // console.log(sale.value);
  return sale.value;
};

const deleteSale = async (id) => {
  const sale = await SalesModel.deleteId(id);
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSales,
  updateSale,
  deleteSale,
};