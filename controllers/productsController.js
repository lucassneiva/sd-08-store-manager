const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const STATUS_CREATE = 201;
const STATUS_OK = 200;

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const dataForUpdate = { name, quantity };
  const result = await productsService.create(dataForUpdate);

  if (result.error) return next(result);

  res.status(STATUS_CREATE).json(result);
});

const getAll = rescue(async (_req, res, _next) => {
  const result = await productsService.getAll();

  res.status(STATUS_OK).json({ products: result });
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await productsService.getById(id);

  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const dataForUpdate = { name, quantity };

  const result = await productsService.update(id, dataForUpdate);
  if (result.error) return next(result);

  res.status(STATUS_OK).json(result);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await productsService.remove(id);
  console.log(result);
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
