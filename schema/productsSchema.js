
const joi = require('@hapi/joi');

const MIN_LENGTH = 5;

const create = joi
  .object({
    name: joi
      .string()
      .min(MIN_LENGTH)
      .message('"name" length must be at least 5 characters long')
      .required(),
    quantity: joi
      .number()
      .integer()
      .min(1)
      .strict()
      .messages({
        'number.base': '{#label} must be a number',
        'number.min': '{#label} must be larger than or equal to 1'
      })
      .required()
  });

module.exports = {
  create
};
