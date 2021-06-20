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
const findAll = rescue(async (req, res, next) => {
  const allSales = await Sales.findAll();
  if (allSales.error) return next(allSales.error);
  return res.status(OK_).json( allSales );
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sales.findById(id);
  if (sale.error) return next(sale.error);
  return res.status(OK_).json( sale );
});

const updateSale = rescue(async (req, res, next) => {
  const { error } = SchemaSales.validate(req.body);
  if (error) return next(error);
  
  
  const { id } = req.params;
  const { body: itensSold } = req;
  
  const sale = await Sales.updateSale({ id, itensSold });
  
  if (sale.error) return next(sale.error);
  
  res.status(OK_).json(sale);
});


module.exports={
  createSale,
  findAll,
  findById,
  updateSale
};