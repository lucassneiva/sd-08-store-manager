const Joi = require('@hapi/joi');

const Sale = require('../models/sale');


const valid = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required()
});

const create = async (items) => {
  const { error } = valid.validate(items);

  if (error) { 
    return {
      status: 422,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' }
    };
  };

  const otherSale = Sale.create(items);

  return otherSale;
};

const getAll = async () => {
  const sales = await Sale.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await Sale.getById(id);

  if (!sale) {
    return {
      status: 404,
      code: 'not_found',
      error: { message: 'Sale not found' }
    };
  }

  return sale;
};

module.exports = {
  create,
  getAll,
  getById
};