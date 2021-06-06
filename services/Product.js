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

module.exports = {
  getAll,
  create,
};