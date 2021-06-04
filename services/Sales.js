const Sales = require('../models/Sales');

const create = async (products) => await Sales.create(products);
const searchById = async (id) => await Sales.searchById(id);
const getAll = async () => await Sales.getAll();

module.exports = {
  create,
  searchById,
  getAll,
};
