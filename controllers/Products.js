const rescue = require('express-rescue');
const Product = require('../services/Products');
const { STATUS_201, STATUS_200, STATUS_422, ERROR_TYPES } = require('../utils/consts');

const create = rescue(async (req, res) => {
  const {name, quantity} = req.body;
  const product = await Product.create(name, quantity);
  return res.status(STATUS_201).json(product);
});

const searchById = rescue(async (req, res) => {
  const {id} = req.params;
  const search = await Product.searchById(id);
  if (search !== null) return res.status(STATUS_200).json(search);
  return res.status(ERROR_TYPES.eId.status).json({err: ERROR_TYPES.eId.err});
});

const getAll = rescue(async (_req, res) => {
  const search = await Product.getAll();
  return res.status(STATUS_200).json(search);
});

module.exports = {
  create,
  searchById,
  getAll,
};
