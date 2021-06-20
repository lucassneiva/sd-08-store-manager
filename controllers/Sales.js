const rescue = require('express-rescue');
const Sales = require('../services/Sales');
const {OK_}=require('../services/variableStatus');
const SchemaSales = require('../schemas/schemaSales');

const createSale = rescue(async (req, res, next) => {
 
  const { error } = SchemaSales.validate(req.body);
  if (error) return next(error);
  
  const itensSold = await Sales.createSale(req.body);
  if (itensSold.error) return next(itensSold.error);
  res.status(OK_).json(itensSold);
});

module.exports={
  createSale
};