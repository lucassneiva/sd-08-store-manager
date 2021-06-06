const Product = require('../models/Product');

const getAll = async() => await Product.getAll();

const create = async(name, quantity) => await Product.create(name, quantity);

module.exports = {
  getAll,
  create,
};
