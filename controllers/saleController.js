const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = rescue(async(req, res, next) => {
  const body = req.body;
  // console.log(body);
  const resultService = await salesService.create(body);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const getAll = rescue(async(req, res, next) => {
  const resultService = await salesService.getAll();
  if(resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

module.exports = {
  create,
  getAll,
};