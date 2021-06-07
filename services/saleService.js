const model = require('../models/saleModel');
const serviceProduct = require('../services/productService');
const { ObjectId } = require('mongodb');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  };
  return sale;
};

const create = async (products) => {
  const ZERO = 0;

  for (const product of products) {
    const result = await serviceProduct.getById(product._id);
    const { quantity } = result;
    if (!result || Number(quantity) <= ZERO || typeof quantity === 'string') {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      };
    }
  }
  return model.create(products);

};

const update = async(id, productId, quantity) => {
  const ZERO = 0;
  if (Number(quantity) < ZERO) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (Number(quantity) === ZERO) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (typeof quantity === 'string') {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  return model.update(id, productId, quantity);
};

const remove = async (id) => {
  const sale = await model.remove(id);
  if (!sale) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  };
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
