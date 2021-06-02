const rescue = require('express-rescue');
const salesServices = require('../services/salesServices');
const OK_STATUS = 200;
const CREATED_STATUS = 201;

const insertSale = rescue(async (req, res, next) => {
  const sale = req.body;
  const result = await salesServices.insertSale(sale);
  if(result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

module.exports = {
  insertSale,
};
