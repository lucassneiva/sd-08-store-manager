const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = rescue(async(req, res, next) => {
  const body = req.body;
  const resultService = await salesService.create(body);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const getAll = rescue(async(req, res, next) => {
  const resultService = await salesService.getAll();
  if(resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const getById = rescue(async(req, res, next) => {
  const { id } = req.params;
  const resultService = await salesService.getById(id);
  if(resultService.err) return next(resultService);
  console.log(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const update = rescue(async(req, res, next) => {
  const { id } = req.params;
  const body = req.body[0];
  const resultService = await salesService.update(body, id);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const deleteSale = rescue(async(req, res, next) => {
  const { id } = req.params;
  const resultService = await salesService.deleteSale(id);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale,
};