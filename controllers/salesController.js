const SalesModel = require('../models/SalesModel');
const salesService = require('../services/salesService');

const SUCCESS = 200;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const BAD_REQUEST = 500;

const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const getAll = async (_req, res) => {
  try {
    const sales = await SalesModel.getAll();

    res.status(SUCCESS).json({ sales });
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesModel.getById(id);

    if (!sale) {
      error.err.code = 'not_found';
      error.err.message = 'Sale not found';

      return res.status(NOT_FOUND).json(error);
    };

    res.status(SUCCESS).json(sale);
  } catch (err) {
    error.err.code = 'not_found';
    error.err.message = 'Sale not found';
    res.status(NOT_FOUND).json({ message: err.message });
  }
};

const add = async (req, res) => {
  try {
    const sales = req.body;
    await salesService.isQuantityValid(sales);
    const newSales = await SalesModel.add(sales);

    res.status(SUCCESS).json(newSales);
  } catch (err) {
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSales = req.body;
    await salesService.isQuantityValid(updateSales);

    const sales = await SalesModel.update(id, updateSales);

    res.status(SUCCESS).json(sales);
  } catch (err) {
    error.err.code = 'invalid_data';
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesModel.exclude(id);

    if (!sale) {
      error.err.code = 'invalid_data';
      error.err.message = 'Wrong sale ID format';
      return res.status(UNPROCESSABLE).json(error);
    };

    res.status(SUCCESS).end();
  } catch (err) {
    error.err.message = err.message;
    res.status(NOT_FOUND).json(error);
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude
};