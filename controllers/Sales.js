const Service = require('../services').Sales;
const tcw = require('../utils').tryCatchWrapper;

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const findById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.findById(id);
  if (error) return next(error);
  res.status(STATUS_OK).json(result);
});

const updateById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.updateById(id, req.body);
  if (error) return next(error);
  res.status(STATUS_OK).json(result);
});

const deleteById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.deleteById(id);
  if (error) return next(error);
  res.status(STATUS_OK).json(result);
});

const getAll = tcw(async (_req, res, next) => {
  const { result, error } = await Service.getAll();
  if (error) return next(error);
  res.status(STATUS_OK).json(result);
});

const insertOne = tcw(async (req, res, next) => {
  const { result, error } = await Service.insertOne(req.body);
  if (error) return next(error);
  res.status(STATUS_CREATED).json(result);
});

module.exports = {
  getAll,
  findById,
  updateById,
  deleteById,
  insertOne,
};
