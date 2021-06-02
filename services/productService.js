const { getAll } = require('../models/ProductsModel');

const verifyName = async (name) => {
  const six = 6;
  const err = {
    message: '"name" length must be at least 5 characters long'
  };

  if (typeof name !== 'string' || name.length < six) throw new Error(err.message);

  const products = await getAll();
  const verifyName = products.some(product => product.name === name);

  if (verifyName) {
    err.message = 'Product already exists';
    throw new Error(err.message);
  };
};

const verifyQuantity = async (quantity) => {
  const one = 1;
  const err = {
    message: '"quantity" must be a number'
  };

  if (typeof quantity !== 'number') throw new Error(err.message);

  if (quantity < one) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw new Error(err.message);
  };
};

module.exports = { verifyName, verifyQuantity };