const joi = require('@hapi/joi');

const saleIsValid = joi
  .object({
    productId: joi.string().required(),
    quantity: joi.number().min(1).strict().required(),
  })
  .messages({
    'any.required': 'Wrong product ID or invalid quantity',
    'number.min': 'Wrong product ID or invalid quantity',
    'number.base': 'Wrong product ID or invalid quantity',
  });

module.exports = joi.array().items(saleIsValid);
