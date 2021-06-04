const salesModel = require('../models/sales');
const salesService = require('../services/sales');
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const INVALID_DATA_STATUS = 422;

const getSales = async (req, res) => {
  const sales = await salesModel.getSales();
  return res.status(OK_STATUS).json(sales);
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
  createSale,
};
