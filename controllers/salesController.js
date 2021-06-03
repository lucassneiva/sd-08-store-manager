const { add, getAll, getById, update, exclude } = require('../models/SalesModel');
const {
  verifyQuantity
} = require('../services/salesService');

const SUCCESS = 200;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const BAD_REQUEST = 500;

const error = {
  err: { code: 'invalid_data', message: '' }
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await getAll();
    res.status(SUCCESS).json({ sales });
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getByIdSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await getById(id);

    if (!sale) {
      error.err.code = 'not_found';
      error.err.message = 'Sale not found';
      return res.status(NOT_FOUND).json(error);
    };

    res.status(SUCCESS).json(sale);
  } catch (err) {
    console.error(err.message);
    error.err.code = 'not_found';
    error.err.message = 'Sale not found';
    res.status(NOT_FOUND).json({ message: err.message });
  }
};

const addSales = async (req, res) => {
  try {
    const requestSales = req.body;
    await verifyQuantity(requestSales);
    const newSales = await add(requestSales);
    res.status(SUCCESS).json(newSales);
  } catch (err) {
    console.error(err.message);
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
	  const requestSales = req.body;
    await verifyQuantity(requestSales);

	  const sales = await update(id, requestSales);

	  res.status(SUCCESS).json(sales);
  } catch (err) {
	  console.error(err.message);
    error.err.code = 'invalid_data';
	  error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await exclude(id);

    if (!sale) {
      error.err.code = 'invalid_data';
      error.err.message = 'Wrong sale ID format';
      return res.status(UNPROCESSABLE).json(error);
    };

    res.status(SUCCESS).end();
  } catch (err) {
    console.error(err.message);
    error.err.message = err.message;
    res.status(NOT_FOUND).json(error);
  }
};

module.exports = {
  addSales,
  getAllSales,
  getByIdSale,
  updateSale,
  deleteSale
};