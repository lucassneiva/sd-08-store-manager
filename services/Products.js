const Products = require('../models/Products');

const create = async (name, quantity) => await Products.create(name, quantity);
const searchByName = async (name) => await Products.searchByName(name);
const searchById = async (id) => await Products.searchById(id);
const updateById = async (id, name, quantity) => (
  await Products.updateById(id, name, quantity));
const getAll = async () => await Products.getAll();

module.exports = {
  create,
  searchByName,
  searchById,
  updateById,
  getAll,
};
