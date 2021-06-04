const rescue = require('express-rescue');
const SalesService = require('../services/salesService');
const { findById } = require('../services/productsService');

const INVALID_ERR = 422;
const OK = 200;
const CREATED = 201;
const NONE = 0;

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

module.exports = {
  createSale,
};
