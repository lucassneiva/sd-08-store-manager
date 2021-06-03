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

const getAll = rescue(async (_req, res, _next) => {
  const result = await SaleService.getAll();
  res.status(OK).json({ sales: result });
});

const findById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const sale = await SaleService.findById(id);

  if (!sale) throw boom.notFound('Sale not found');

  res.status(OK).json(sale);
});

const update = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const updateSale = req.body;

  const updatedSale = await SaleService.update(id, updateSale);

  if (!updatedSale) throw boom.notFound('Unable to update product with invalid id');

  res.status(OK).json(updatedSale);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
};
