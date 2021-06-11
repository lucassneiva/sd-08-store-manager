const Joi = require('@hapi/joi');

const MIN_LENGTH = 5;
const MIN_QUANTITY = 1;

const productSchema = Joi.object({
  name: Joi
    .string()
    .min(MIN_LENGTH)
    .required(),
  quantity: Joi
    .number()
    .min(MIN_QUANTITY)
    .required()
});

module.exports = productSchema;
