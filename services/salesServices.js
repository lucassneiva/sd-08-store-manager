const Joi = require('joi');
const salesModels = require('../models/salesModel');
const productModels = require('../models/productsModel');

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
  const validateQuantinty = await productModels.findByIdProducts(data[0].productId);

  if (validateQuantinty[0].quantity < data[0].quantity) {
    return {
      statusCode: 404,
      json: {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        }
      }
    };
  }

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
  if (!result || result.length === 0) return {
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

const updateSalesServices = async (id, data) => {
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

  const result = await salesModels.updateSales(id, data);
  return {
    statusCode: 200,
    json: result,
  };
};

const deleteSalesServices = async (id) => {
  const result = await salesModels.deleteSales(id);

  if (!result) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    }
  };

  return {
    statusCode: 200,
    json: result.value,
  };
};

module.exports = {
  addSalesServices,
  getAllSalesServices,
  findByIdSalesServices,
  updateSalesServices,
  deleteSalesServices
};
