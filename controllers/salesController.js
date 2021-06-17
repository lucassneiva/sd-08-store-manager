const SalesModel = require('../models/salesModel');
const SalesService = require('../services/salesServices');

const STATUS_ERROR = 500;
const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_500 = 500;
const STATUS_404 = 404;

async function create(req, res) {
  try {
    const newSale = await SalesService.create(req.body);
    if(newSale.error) return res.status(STATUS_422).json({err: {
      code: 'invalid_data',
      message: newSale.message,
    }});
    res.status(STATUS_200).json(newSale);
  } catch (error) {
    return false;
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

  } catch (error) {
    res.status(STATUS_404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
}

module.exports = {
  create,
  getAll,
  getById
};
