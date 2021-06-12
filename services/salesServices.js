const joi = require('@hapi/joi');
const model = require('../models/salesModel');

const ZERO = 0;
const ONE = 1;

const UNPROCESS = 422;
const NOT_FOUND = 404;

const schema = joi.object({
  productId: joi
    .string(),
  quantity: joi
    .number()
    .min(ONE)
    .message('Wrong product ID or invalid quantity')
    .required(),
});

const handleCreateUpdate = (arr) => {
  let erros = ZERO;
  let err;
  arr.forEach((sale) => {
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

  return { erros, err };
};

const create = async(sales) => {
  const { erros, err } = handleCreateUpdate(sales);

  if (erros > ZERO) {
    return {
      code: 'invalid_data',
      error: err,
      status: UNPROCESS,
    };
  }

  return model.createSales(sales);
};

const getAll = async () => model.getAllSales();

const getById = async (id) => {
  const resp = await model.getSaleById(id);

  return resp
    ? model.getSaleById(id)
    : {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: NOT_FOUND,
    };
};

const update = async (id, sales) => {
  const { erros, err } = handleCreateUpdate(sales);

  if (erros > ZERO) {
    return {
      code: 'invalid_data',
      error: err,
      status: UNPROCESS,
    };
  }

  return model.updateSale(id, sales);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
