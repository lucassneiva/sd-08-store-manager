const joi = require('@hapi/joi');
const model = require('../models/productModel');
const { ObjectID } = require('mongodb');

const ONE = 1;
const FIVE = 5;

const UNPROCESS = 422;

const schema = joi.object({
  name: joi
    .string()
    .min(FIVE)
    .message('"name" length must be at least 5 characters long')
    .required(),
  quantity: joi
    .number()
    .min(ONE)
    .message('"quantity" must be larger than or equal to 1')
    .required(),
});

const getAll = async () => model.getAllProducts();

const getById = async (id) => {
  const resp = await model.getById(id);

  return resp
    ? model.getById(id)
    : {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: UNPROCESS,
    };
};

const create = async (product) => {
  const { error } = schema.validate(product);
  if (error) {
    return {
      code: 'invalid_data',
      error,
      status: UNPROCESS,
    };
  }

  const { name } = product;
  const inDB = await model.checkName(name);
  if (inDB)
  {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: UNPROCESS,
    };
  }

  return model.createProduct(product);
};

module.exports = { getAll, getById, create };
