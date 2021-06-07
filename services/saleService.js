const model = require('../models/saleModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
    return {
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
    const { quantity } = product;
    if (Number(quantity) <= ZERO || typeof quantity === 'string') {
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

const update = async(id, products) => {
  const ZERO = 0;
  for (const product of products) {
    const { quantity } = product;
    if (Number(quantity) <= ZERO || typeof quantity === 'string') {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      };
    }
  }
  return model.update(id, products);
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
