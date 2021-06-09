const joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const HTTP_Unprocessable_Entity = 422;
// const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;

const schema = joi.array().items({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(MIN_QUANTITY)
    .required(),
});

const getAll = async () => salesModel.getAll();

const create = async (items) => {
  const { error } = schema.validate(items);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: HTTP_Unprocessable_Entity
    };
  };

  const newSale = await salesModel.create(items);

  return newSale;
};

module.exports = {
  getAll,
  create,
}; 