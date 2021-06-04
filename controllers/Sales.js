const rescue = require('express-rescue');
const Sale = require('../services/Sales');
const { STATUS_200 } = require('../utils/consts');

const create = rescue(async (req, res) => {
  const products = req.body;
  const sale = await Sale.create(products);
  return res.status(STATUS_200).json(sale);
});

module.exports = {
  create,
};
