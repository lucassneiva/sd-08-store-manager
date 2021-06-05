const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/products');

const { SUCCESS, CREATED, INVALID_DATA, MIN_STR_LENGTH } = require('../constants');

const createOne = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(MIN_STR_LENGTH).required(),
    quantity: Joi.number().min(1).strict().required()
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const product = await service.create(req.body);

  if (product.error) return res.status(INVALID_DATA).json(product.error);

  return res.status(CREATED).json(product);
});

const getAllProducts = rescue(async (req, res, next) => {
  const result = await service.getAll();

  // console.log(result.topology.s.seedlist);
  // if (product.error) return res.status(INVALID_DATA).json(product.error);

  return res.status(SUCCESS).json({products: result});
});

const getById = rescue(async (req, res, next) => {
  const {id} = req.params;

  // console.log(id);

  const result = await service.getById(id);

  // console.log(result.topology.s.seedlist);
  if (result.error) return res.status(INVALID_DATA).json(result.error);

  return res.status(SUCCESS).json(result);
});

module.exports = {
  createOne,
  getAllProducts,
  getById
};
