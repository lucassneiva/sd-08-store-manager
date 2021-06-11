const joi = require('@hapi/joi');
const model = require('../models/saleModel');

const ONE = 1;

const schema = joi.array().items({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(ONE)
    .required(),
});

const getAll = async () => {
  const listAllSales = await model.getAll();

  if (!listAllSales) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found'},
      status: 404
    };
  }
  return listAllSales;
};

const add = async (itensSold) => {
  const { error } = schema.validate(itensSold);
  if (error) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity'},
      status: 422
    };
  }

  return await model.add(itensSold);
};

const getById = async (id) => {
  const saleId = await model.getById(id);

  if (!saleId) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found'},
      status: 404
    };
  }

  return saleId;
};

const update = async (id, itensSold) => {
  const { error } = schema.validate(itensSold);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity'},
      status: 422
    };
  };

  const sale = await model.update(id, itensSold);

  return sale;
};

const deleteSale = async (id) => {
  const sale = await model.getById(id);
  
  if (!sale){
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: 422
    };
  }

  const deletedSale = await model.deleteSale(id);
  
  return deletedSale;
};


module.exports = {
  getAll,
  add,
  getById,
  update,
  deleteSale,
}; 
  
