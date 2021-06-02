const Joi = require('joi');
const salesModels = require('../models/salesModel');

const addSalesValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().min(1).required()
  });

  const result = data.map((data) => Joi.validate(data, schema));
  const { error } = result.find((err) => err !== null);
  return error;
};

const addSalesServices = async (data) => {
  const error = addSalesValidation(data);

  if (error) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    }
  };

  return {
    statusCode: 200,
    json: await salesModels.addSales(data),
  };
};

const getAllSalesServices = async () => {
  return {
    statusCode: 200,
    json: {
      sales: await salesModels.getAllSales(),
    },
  };
};

const findByIdSalesServices = async (id) => {
  const result =  await salesModels.findByIdSales(id);
  if (!result) return {
    statusCode: 404,
    json: {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    }
  };

  return {
    statusCode: 200,
    json: result[0],
  };
};

module.exports = {
  addSalesServices,
  getAllSalesServices,
  findByIdSalesServices
};
