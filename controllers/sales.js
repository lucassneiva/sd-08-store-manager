const e = require('express');
const salesService = require('../services/sales');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  try {
    const arr = req.body;
    const sale = await salesService.create(arr);
    res.status(OK).json(sale);
  } catch (e) {
    if (e.message === 'Such amount is not permitted to sell') return res
      .status(NOT_FOUND).json({
        err: {
          code: 'stock_problem',
          message: e.message,
        }
      });
    
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(OK).json({ sales });
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getById(id);
    res.status(OK).json(sales);
  } catch (e) {
    res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: e.message,
      }
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const arr = req.body;
    const sale = await salesService.update(id, arr);
    res.status(OK).json(sale);
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;
    await salesService.erase(id);
    res.status(OK).json({ message: 'Sale deleted.' });
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
