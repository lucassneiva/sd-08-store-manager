const rescue = require('express-rescue');
const productsService  = require('../services/productsService');

const STATUS_CREATE = 201;
const STATUS_OK = 200;

const create = rescue(async (req, res, next) => {  
  const { name, quantity } = req.body;

  const result =  await productsService.create(name, quantity);

  if(result.error) return next(result);

  res.status(STATUS_CREATE).json(result);
});

const getAll = rescue(async (_req, res, _next) => {

  const result = await productsService.getProducts();

  res.status(STATUS_OK).json({ products: result});

});

const getById = rescue(async(req, res, next) => {
  const { id } = req.params;

  const result = await productsService.getProducts(id);

  if(result.error) return next(result);

  res.status(STATUS_OK).json(result);

});


module.exports = {
  create,
  getAll,
  getById,
};
