const Product = require('../models/Product');

const getAll = async() => await Product.getAll();

const findById = async(id) => await Product.findById(id);

const create = async(name, quantity) => await Product.create(name, quantity);

module.exports = {
  getAll,
  findById,
  create,
};
