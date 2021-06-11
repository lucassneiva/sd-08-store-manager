const Joi = require('@hapi/joi');

const MIN_QUANTITY = 1;
const ERROR = 'Wrong product ID or invalid quantity';

const salesSchema = Joi.object({
  productId: Joi
    .string()
    .required(),
  quantity: Joi
    .number()
    .min(MIN_QUANTITY)
    .required()
}).messages({
  'number.min': ERROR,
  'any.required': ERROR,
  'number.base': ERROR
});

module.exports = Joi.array().items(salesSchema);