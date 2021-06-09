const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const HTTP_OK = 200;

const getAll = rescue(async (req, res) => {
  const sales = await salesService.getAll();

  res.status(HTTP_OK).json(sales);
});

const create = rescue(async (req, res, next) => {
  const items = req.body;

  const newSale = await salesService.create(items);

  if (newSale.error) return next(newSale);

  res.status(HTTP_OK).json(newSale);
});


module.exports = {
  getAll,
  create,
};