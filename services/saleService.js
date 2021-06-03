const Joi = require('@hapi/joi');

const model = require('../models/saleModel');

const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const validateSale = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required()
});

const create = async (items) => {
  const { error } = validateSale.validate(items);

  if (error) { 
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }
    };
  };

  const newSale = model.create(items);

  return newSale;
};

const readAll = async () => {
  const sales = await model.readAll();

  return sales;
};

const readById = async (id) => {
  const sale = await model.readById(id);

  if (!sale) {
    return {
      status: NOT_FOUND,
      code: 'not_found',
      error: { message: 'Sale not found' }
    };
  }

  return sale;
};

module.exports = {
  create,
  readAll,
  readById
};
