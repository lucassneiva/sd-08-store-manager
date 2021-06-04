const rescue = require('express-rescue');
const Sale = require('../services/Sales');
const { STATUS_200, ERROR_TYPES } = require('../utils/consts');

const create = rescue(async (req, res) => {
  const products = req.body;
  const sale = await Sale.create(products);
  return res.status(STATUS_200).json(sale);
});

const searchById = rescue(async (req, res) => {
  const { id } = req.params;
  const search = await Sale.searchById(id);
  if (search !== null) return res.status(STATUS_200).json(search);
  return res.status(ERROR_TYPES.eSaleId.status).json({err: ERROR_TYPES.eSaleId.err});
});

const getAll = rescue(async (_req, res) => {
  const search = await Sale.getAll();
  return res.status(STATUS_200).json({ sales: search });
});

module.exports = {
  create,
  searchById,
  getAll,
};
