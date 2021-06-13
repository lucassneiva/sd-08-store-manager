const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const STATUS_OK = 200;

const create = rescue (async(req, res, next) =>{
  const itensSold = [...req.body];
  const result =  await salesService.create(itensSold);

  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

const getAll = rescue (async(_req, res, _next) => {
  const result = await salesService.getSales();
  res.status(STATUS_OK).json({ sales: result});
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getSales(id);

  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

const update = rescue (async(req, res, next) => {
  const { id } = req.params;
  const itensSold = [...req.body];

  const result = await salesService.update(id, itensSold);

  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await salesService.remove(id);

  console.log('ERROR', result);

  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

module.exports = {
  create,
  getAll,
  getById, 
  update, 
  remove
};