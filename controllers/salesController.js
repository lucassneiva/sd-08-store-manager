const SalesService = require('../services/salesService');

const ok = 200;

const addNewSale = async (req, res, next) => {
  const sale = req.body;
  const result = await SalesService.addNewSale(sale);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

const getAllSales = async (req, res, next) => {
  const result = await SalesService.getAllSales();
  res.status(ok).json(result);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesService.getSaleById(id);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const newSaleInfo = req.body;
  const result = await SalesService.updateSaleById(id, newSaleInfo);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

const deleteSaleById = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesService.deleteSaleById(id);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};