const ProductsModel = require('../models/ProductsModel');

const err = {
  message: ''
};

const isValidName = async (name) => {
  const MIN_LENGTH_NAME = 6;

  if (typeof name !== 'string' || name.length < MIN_LENGTH_NAME) {
    err.message = '"name" length must be at least 5 characters long';
    throw new Error(err.message);
  }
};

const productAlreadyExists = async (name) => {
  const products = await ProductsModel.getAll();
  const nameExists = products.find(product => product.name === name);

  if (nameExists) {
    err.message = 'Product already exists';
    throw new Error(err.message);
  };
};

const isValidQuantity = async (quantity) => {
  const MIN_LENGTH_QUANTITY = 1;
  if (typeof quantity !== 'number') {
    err.message = '"quantity" must be a number';
    throw new Error(err. message);
  }

  if (quantity < MIN_LENGTH_QUANTITY) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw new Error(err.message);
  };
};

module.exports = {
  isValidName,
  productAlreadyExists,
  isValidQuantity
};
