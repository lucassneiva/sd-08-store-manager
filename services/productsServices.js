const productModel = require('../models/productsModels');

const MINIMUM_LENGHT = 5;

const validProduct = ({ name, quantity }) => {
  if (name.length < MINIMUM_LENGHT) return ({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' }
  });
  if (typeof quantity === 'string') return ({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });
  if (quantity < 1) return ({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  });
  return null;
};

const create = async (product) => {
  const result = await productModel.create(product);
  if (result === 'found') return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  });
  return result;
};

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const findById = async (productId) => {
  const result = await productModel.findById(productId);
  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  });
  return result;
};

module.exports = {
  create,
  validProduct,
  getAll,
  findById,
};
