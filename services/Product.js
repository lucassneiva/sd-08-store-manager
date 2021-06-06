const joi = require('@hapi/joi');
const Product = require('../models/Product');

const HTTP_Unprocessable_Entity = 422;
const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;

const schema = joi.object({
  name: joi
    .string()
    .min(MIN_LENGTH_NAME)
    .message('"name" length must be at least 5 characters long')
    .required(),
  quantity: joi
    .number()
    .min(MIN_QUANTITY)
    .message('"quantity" must be larger than or equal to 1')
    .required(),
});

const getAll = async () => Product.getAll();

const findById = async (id) => {
  const productID = await Product.findById(id);

  if (!productID) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: HTTP_Unprocessable_Entity
    };
  }

  return productID;
};

const create = async (name, quantity) => {
  const { error } = schema.validate({ name, quantity });

  if (error) { 
    return {
      code: 'invalid_data',
      error,
      status: HTTP_Unprocessable_Entity
    };
  };

  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: HTTP_Unprocessable_Entity
    };
  };

  return Product.create(name, quantity);
};

const update = async (id, name, quantity) => {
  const { error } = schema.validate({ name, quantity });

  if (error) { 
    return {
      code: 'invalid_data',
      error,
      status: HTTP_Unprocessable_Entity
    };
  };

  const updateProduct = await Product.update(id, name, quantity);

  return updateProduct;
};

const exclude = async (id) => {
  const productID = await Product.findById(id);

  if (!productID) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: HTTP_Unprocessable_Entity
    };
  }

  const excludeProduct = await Product.exclude(id);

  return excludeProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};