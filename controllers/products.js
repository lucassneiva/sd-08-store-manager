const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/products');

const { CREATED, INVALID_DATA, MIN_STR_LENGTH } = require('../constants');

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

  res.status(CREATED).json(product);
});

module.exports = {
  createOne,
};
