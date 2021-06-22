const Products = require('../models/products');

const MIN_CHARACTERS = 5;
const MIN_QUANTITY = 1;

const INVALID_NAME = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: `"name" length must be at least ${MIN_CHARACTERS} characters long`
    }
  }
};

const ALREADY_EXISTS = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  }
};

const INVALID_QUANTITY_TYPE = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  }
};

const INVALID_QUANTITY = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: `"quantity" must be larger than or equal to ${MIN_QUANTITY}`
    }
  }
};

const validateBody = (name, quantity) => {
  if (name.length < MIN_CHARACTERS) return INVALID_NAME;
  if (typeof quantity !== 'number') return INVALID_QUANTITY_TYPE;
  if (quantity < MIN_QUANTITY) return INVALID_QUANTITY;

  return null;
};

const create = async (name, quantity) => {
  const isValid = validateBody(name, quantity);
  if (isValid) return isValid;

  const productAlreadyExists = await Products.findByName(name);
  if (productAlreadyExists) return ALREADY_EXISTS;

  const newProduct = await Products.create(name, quantity);
  return { status: 201, response: newProduct };
};

module.exports = {
  create
};
