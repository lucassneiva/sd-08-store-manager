const Service = require('../services').Sales;
const tcw = require('../utils').tryCatchWrapper;

const findById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.findById(id);
  if (error) return next(error);
  res.status(200).json(result);
});

const updateById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.updateById(id, req.body);
  if (error) return next(error);
  res.status(200).json(result);
});

const deleteById = tcw(async (req, res, next) => {
  const { id } = req.params;
  const { result, error } = await Service.deleteById(id);
  if (error) return next(error);
  res.status(200).json(result);
});

const getAll = tcw(async (_req, res, next) => {
  const { result, error } = await Service.getAll();
  if (error) return next(error);
  res.status(200).json(result);
});

const insertOne = tcw(async (req, res, next) => {
  const { result, error } = await Service.insertOne(req.body);
  if (error) return next(error);
  res.status(201).json(result);
});

module.exports = {
  getAll,
  findById,
  updateById,
  deleteById,
  insertOne,
};
