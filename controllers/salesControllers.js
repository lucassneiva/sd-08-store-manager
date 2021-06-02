const rescue = require('express-rescue');
const salesServices = require('../services/salesServices');
const OK_STATUS = 200;

const insertSale = rescue(async (req, res, next) => {
  const sale = req.body;
  const result = await salesServices.insertSale(sale);
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const getSaleById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await salesServices.getSaleById(id);
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const getAllSales = rescue(async (req, res, next) => {
  const result = await salesServices.getAllSales();
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const updateSale = rescue(async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;
  const { productId, quantity } = sale[0];
  const result = await salesServices.updateSale(id, productId, quantity);
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const deleteSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await salesServices.deleteSale(id);
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

module.exports = {
  insertSale,
  getSaleById,
  getAllSales,
  updateSale,
  deleteSale,
};
