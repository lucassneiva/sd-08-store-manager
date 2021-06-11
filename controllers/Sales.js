const rescue = require('express-rescue');
const service = require('../services/Sales');
const salesSchema = require('../schemas/SalesSchema');

const OK = 200;

const create = rescue(async (req, res, next) => {

  const { error } = salesSchema.validate(req.body);
  
  if (error) return next(error);
  
  const itensSold = await service.create(req.body);
  
  if (itensSold.error) return next(itensSold.error);
  
  res.status(OK).json(itensSold);
});

module.exports = {
  create,
};