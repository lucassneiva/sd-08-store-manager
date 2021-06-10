const rescue = require('express-rescue');
const productsService  = require('../services/productsService');

const STATUS_CREATE = 201;

const create = rescue(async (req, res, next) => {  
  const { name, quantity } = req.body;

  const result =  await productsService.create(name, quantity);

  if(result.err) return next(result);

  res.status(STATUS_CREATE).json(result);
});

module.exports = {
  create,
};
