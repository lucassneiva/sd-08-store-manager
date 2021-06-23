const SalesModel = require('../models/salesModel');
const SalesService = require('../services/salesServices');

const STATUS_422 = 422;
const STATUS_200 = 200;
const STATUS_404 = 404;

async function create(req, res) {
  try {
    const newSale = await SalesService.create(req.body);
    res.status(STATUS_200).json(newSale);
  } catch (error) {
    res.status(error.statusCode).json({
      err: {
        code: error.code,
        message: error.message
      }
    });
  }
}

async function getAll(_req, res) {
  try {
    const sales = await SalesModel.getAll();
    res.status(STATUS_200).json({
      sales: [
        ...sales
      ]
    });
  } catch (error) {

  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const sale = await SalesModel.getById(id);
    if(sale) return res.status(STATUS_200).json(sale);
    throw new Error();
  } catch (error) {
    res.status(STATUS_404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const updatedSale = await SalesService.update(id, req.body);
    res.status(STATUS_200).json(updatedSale);
  } catch (error) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
}

async function exclude(req, res) {
  try {
    const { id } = req.params;
    const product = await SalesService.exclude(id);
    res.status(STATUS_200).json(product);
  } catch (error) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude
};
