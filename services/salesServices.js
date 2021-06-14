// Service faz conexão com o model, sendo utilizado pelo controller, geralmente aqui ficam os ifs
const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllTheSales();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const createSale = async (addedSale) => {
  const sale = await salesModel.addSaleToDB(addedSale);
  return sale;
};

const updateSaleById = async (id, productId, quantity) => {
  const sale = await salesModel.updateOrCreateSale(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  const deleteSale = await salesModel.deleteSaleById(id);
  return deleteSale;
};

module.exports = {
  getAllSales,
  createSale,
  getById,
  updateSaleById,
  deleteById,
};
