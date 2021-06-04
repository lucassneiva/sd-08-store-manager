const salesModel = require('../models/sales');
const salesService = require('../services/sales');
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const INVALID_DATA_STATUS = 422;
const NOT_FOUND_STATUS = 404;

const getSales = async (req, res) => {
  const sales = await salesModel.getSales();
  return res.status(OK_STATUS).json({sales});
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.idIsValid(id);
  if (sale.err) return res.status(NOT_FOUND_STATUS).json(sale);

  return res.status(OK_STATUS).json(sale);
};

const createSale = async (req, res) => {
  const sales = req.body;
  const isValid = salesService.saleIsValid(sales);
  if (isValid.err) return res.status(INVALID_DATA_STATUS).json(isValid);
  const newSale = await salesModel.createSale(isValid);

  return res.status(OK_STATUS).json(newSale);
};

module.exports = {
  getSales,
  findSale,
  createSale,
};
