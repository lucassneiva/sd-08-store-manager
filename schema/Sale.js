const joi = require('@hapi/joi');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const itemsSchema = joi.object({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(1)
    .required()
})
  .messages({
    'any.required': ERROR_MESSAGE,
    'number.min': ERROR_MESSAGE,
    'number.base': ERROR_MESSAGE
  });

module.exports = joi
  .array()
  .items(itemsSchema);
