const joi = require('@hapi/joi');
const model = require('../models/productModel');

const ONE = 1;
const FIVE = 5;

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

const getAll = async () => model.getAll();

const add = async (name, quantity) => {
  const { error } = schema.validate({ name, quantity });
  if (error) {
    return {
      code: 'invalid_data',
      error,
      status: 422
    };
  }

  const productAlreadyInserted = await model.getByName(name);
  
  if (productAlreadyInserted) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists'},
      status: 422
    };
  }

  return model.add(name, quantity);
};

const getById = async (id) => {
  const productID = await model.getById(id);

  if (!productID) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: 422
    };
  }

  return productID;
};

const update = async (id, name, quantity) => {
  const { error } = schema.validate({ name, quantity });

  if (error) { 
    return {
      code: 'invalid_data',
      error,
      status: 422
    };
  };

  const productId = await model.update(id, name, quantity);

  return productId;
};


module.exports = {
  getAll,
  add,
  getById,
  update,
}; 
  
