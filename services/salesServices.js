const joi = require('@hapi/joi');
const model = require('../models/salesModel');

const ZERO = 0;
const ONE = 1;

const UNPROCESS = 422;

const schema = joi.object({
  productId: joi
    .string(),
  quantity: joi
    .number()
    .min(ONE)
    .message('Wrong product ID or invalid quantity')
    .required(),
});

const create = async(sales) => {
  let erros = ZERO;
  let err;
  sales.forEach((sale) => {
    const { quantity } = sale;
    if (typeof quantity !== 'number')
    {
      err = { message: 'Wrong product ID or invalid quantity' };
      erros += ONE;
      return;
    }
    const { error } = schema.validate(sale);
    if (error) {
      erros =+ ONE;
      err = error;
    }
  });

  if (erros > ZERO) {
    return {
      code: 'invalid_data',
      error: err,
      status: UNPROCESS,
    };
  }

  return model.createSales(sales);
};

module.exports = {
  create,
};
