const saleModel = require('../models/saleModel');

const HTTP_STATUS_OK = 200;
const INTERNAL_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUNT = 404;

const getAllSales = async (req, res) => {
  try {
    const results = await saleModel.getAllSales();
    res.status(HTTP_STATUS_OK).json({ sales: results });
  } catch (err) {
    console.error();
    res.status(UNPROCESSABLE_ENTITY).json({ message: err.message });
  }
};

const addSales = async (req, res) => {
  try {
    const sales = req.body;
    const newSales = await saleModel.addSales(sales);

    res.status(HTTP_STATUS_OK).json(newSales);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleModel.getSaleById(id);

    if(!result) {
      return res.status(NOT_FOUNT).json({ 
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
    }

    res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

module.exports = {
  getAllSales,
  addSales,
  getSaleById
};