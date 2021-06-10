const salesModel = require('../models/sales');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  return sales;
};

const create = async (bodySales) => {
  const sales = await salesModel.create(bodySales);
  return sales;
};

const updateById = async (id, updatedSale) => {
  const sales = await salesModel.updateById(id, updatedSale);
  return sales;
};

const deleteById = async (id) => {
  const deletedSales = await salesModel.getById(id);
  await salesModel.deleteById(id);
  return deletedSales;
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
