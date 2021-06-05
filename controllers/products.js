const rescue = require('express-rescue');
const service = require('../services/products');
const Joi = require('joi');

const CREATED = 201;
const INVALID_DATA = 422;
const MIN_STR_LENGTH = 5;

const createOne = rescue(async (req, res, next) => {
  const {error} = Joi.object({
    name: Joi.string().min(MIN_STR_LENGTH).required(),
    quantity: Joi.number().min(1).strict().required()
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const product = await service.create(req.body);

  if (product.error) return res.status(INVALID_DATA).json(product.error);

  res.status(CREATED).json(product);
});

module.exports = {
  createOne,
};
