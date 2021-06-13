
const joi = require('@hapi/joi');
const message = 'Wrong product ID or invalid quantity';

const sales = joi
  .object({
    productId: joi
      .string()
      .messages({
        'string.base': message,
      })
      .required(),
    quantity: joi
      .number()
      .integer()
      .min(1)
      .strict()
      .messages({
        'number.base': message,
        'number.integer': message,
        'number.min': message,
        'number.strict': message
      })
      .required()
  });

module.exports = sales;
