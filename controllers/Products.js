const rescue = require('express-rescue');
const Product = require('../services/Products');
const { STATUS_201 } = require('../utils/consts');

const create = rescue(async (req, res) => {
  const {name, quantity} = req.body;
  const product = await Product.create(name, quantity);
  return res.status(STATUS_201).json(product);
});

const searchByName = rescue(async (req, res) => {
  const {name} = req.params;
  const search = await Product.searchByName(name);
  return res.status(STATUS_201).json(search);
});

module.exports = {
  create,
  searchByName,
};
