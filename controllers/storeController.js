const rescue = require('express-rescue');
const StoreService = require('../services/storeService');

const successStatus = 200;
const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const response = await StoreService.create(req.body);
  // console.log('STORECONTROLLER', response);
  if (response.isJoi) {
    // console.log('entrou no isJoi');
    return next(response.details[0].message);
  }
  if (response.message) {
    // console.log('entrou no dominio');
    return next(response.message);
  }
  res.status(responseSuccessStatus).json(response);
  // res.status(responseSuccessStatus).send('OK');
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await StoreService.getAll();
  // console.log(response);
  res.status(successStatus).json({ products: response });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await StoreService.findById(id);
  // console.log('findById Controller', response);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await StoreService.updateById(id, name, quantity);
  if (response.isJoi) return next(response.details[0].message);
  if (response.message) return next(response.message);
  res.status(successStatus).json({ _id: id, name, quantity });
});

module.exports = {
  create, getAll, findById, updateById,
};