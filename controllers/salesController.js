const rescue = require('express-rescue');
const SalesService = require('../services/salesService');
const { findById } = require('../services/productsService');

const NONE = 0;
const OK = 200;
const CREATED = 201;
const INVALID_ERR = 422;
const NOT_FOUND = 404;

const checkSalesProductsIds = async (salesArray) => {
  const productsIds = salesArray.map(({ productId }) => findById(productId));
  const returnedIds = await Promise.all(productsIds);
  const isIdInvalid = returnedIds.some((productId) => !productId);
  if(isIdInvalid) return false;
  return true;
};

const checkSalesQuantity = (salesArray) => {
  const isQuantityInvalid = salesArray
    .some(({quantity}) => typeof quantity !== 'number' || quantity <= NONE);
  return !isQuantityInvalid;
};

const createSale = rescue(async (req, res) => {
  const sale = req.body;
  if(!checkSalesProductsIds(sale) || !checkSalesQuantity(sale)) return res
    .status(INVALID_ERR).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  const newSale = await SalesService.createSale(sale);
  return res.status(OK).json(newSale);
});

const listAllSales = rescue(async (_req, res) => {
  const allSales = await SalesService.listAllSales();
  res.status(OK).json(allSales);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getSaleById(id);
  if(!sale) return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });
  res.status(OK).json(sale);
});

module.exports = {
  createSale,
  listAllSales
};
