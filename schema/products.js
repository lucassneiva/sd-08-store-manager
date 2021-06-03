const joi = require('@hapi/joi');

const FIVE = 5;
const ONE = 1;

module.exports = joi
  .object({
    name: joi
      .string()
      .min(FIVE)
      .message('"name" length must be at least 5 characters long')
      .required(),
    quantity: joi
      .number()
      .min(ONE)
      .message('"quantity" must be larger than or equal to 1')
      .strict()
      .required(),
  })
  .messages({
    'any.required': 'O campo {#label} é obrigatório.',
  });
