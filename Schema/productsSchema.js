const { findByName } = require('../models/productsModel');
const MIN_LENGTH = 5;
const QUANTITY_ZERO = 0;

const validate = async (name, quantity) => {
  if (name.length < MIN_LENGTH) return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  };
  if (typeof quantity === 'string') return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }
  };
  if (quantity <= QUANTITY_ZERO) return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  };
  return;
};

const productExists = async (name) => {
  if (await findByName(name)) return {
    status: 422,
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };
  return;
};

module.exports = {
  validate,
  productExists
};
