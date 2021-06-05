const { getAll } = require('../models/productModel');

const isValidName = async (name) => {
  const MIN_NAME = 6;
  const err = {
    message: '"name" length must be at least 5 characters long'
  };

  if (typeof name !== 'string' || name.length < MIN_NAME) throw new Error(err.message);

  const products = await getAll();
  const isValidName = products.some(product => product.name === name);

  if (isValidName) {
    err.message = 'Product already exists';
    throw new Error(err.message);
  };
};

const isValidQuantity = async (quantity) => {
  const MIN_QTT = 1;
  const err = {
    message: '"quantity" must be a number'
  };

  if (typeof quantity !== 'number') throw new Error(err.message);

  if (quantity < MIN_QTT) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw new Error(err.message);
  };
};

module.exports = { isValidName, isValidQuantity };
