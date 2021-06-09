const joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const HTTP_Unprocessable_Entity = 422;
// const MIN_LENGTH_NAME = 5;
const HTTP_Not_Found = 404;
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

const getAll = async () => {
  const resultAll = await salesModel.getAll();

  if (resultAll === null) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return resultAll;
};

const getById = async (id)=>{
  const result = await salesModel.getById(id);

  if (!result) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return result;
};

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

const update = async(id, items)=>{
  const { error } = schema.validate(items);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: HTTP_Unprocessable_Entity
    };
  };

  const result = await salesModel.update(id, items);
  return result;
  
};

const exclude = async (id) => {
  const saleID = await salesModel.getById(id);

  if (!saleID) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: HTTP_Unprocessable_Entity
    };
  }
  
  const result = await salesModel.exclude(id);
  return result;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
}; 