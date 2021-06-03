const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const SaleService = require('../services/Sale');

const OK = 200;

const create = rescue(async (req, res, _next) => {
  const itensSold = req.body;
  const newSales = await SaleService.create(itensSold);

  if (!newSales) throw boom.badData('Wrong product ID or invalid quantity');

  res.status(OK).json(newSales);
});

module.exports = {
  create,
};
