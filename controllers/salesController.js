const rescue = require('express-rescue');
const SalesService = require('../services/salesService');

const successStatus = 200;
const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const productsSold = req.body;
  const response = await SalesService.create(productsSold);
  if (response.message) {
    // console.log('código', response);
    return next(response.message);
  }
  res.status(successStatus).json(response);
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await SalesService.getAll();
  // console.log(response);
  res.status(successStatus).json({ sales: response });
});

const getByIds = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await SalesService.getByIds(id);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

// const updateById = rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const response = await StoreService.updateById(id, name, quantity);
//   if (response.isJoi) return next(response.details[0].message);
//   if (response.message) return next(response.message);
//   res.status(successStatus).json({ _id: id, name, quantity });
// });

const deleteById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await SalesService.deleteById(id);
  // console.log('CONTROLLER', response[0]);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response[0]);
});

module.exports = {
  create,
  getAll,
  getByIds,
  // updateById,
  deleteById,
};