// orientação da aluna ana karine para usar o joi
//https://github.com/tryber/sd-08-store-manager/tree/ana-karine-sd-08-store-manager
const joi = require('@hapi/joi');
const productModel = require('../models/productModel');

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

const getAll = async () =>  productModel.getAll();

const getById = async (id) => {
  const result = await productModel.getById(id);

  if (!result) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: HTTP_Unprocessable_Entity
    };
  }

  return result;
};


const addProduct = async (name, quantity) => {
  const { error } = schema.validate({ name, quantity });

  if (error) {
    return {
      code: 'invalid_data',
      error,
      status: HTTP_Unprocessable_Entity
    };
  }

  const existingProduct = await productModel.findByName(name);

  if (existingProduct) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: HTTP_Unprocessable_Entity
    };
  };

  return productModel.create(name, quantity);

};

module.exports = {
  getAll,
  getById,
  addProduct,
};

