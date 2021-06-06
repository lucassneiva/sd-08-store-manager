const model = require('../models/saleModel');
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

const create = async ({productId, quantity}) => {
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
  return model.create(productId, quantity);
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
  remove,
};
