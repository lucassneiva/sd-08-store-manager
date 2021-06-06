const Product = require('../models/Product');

const getAll = async() => await Product.getAll();

const findById = async(id) => await Product.findById(id);

const create = async(name, quantity) => await Product.create(name, quantity);

const update = async(id, name, quantity) => await Product.update(id, name, quantity);

const remove = async(id) => await Product.remove(id);

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};
