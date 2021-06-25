const Joi = require('@hapi/joi');

const Product = require('../models/product');

const nameLen = 5;
const valid = Joi.object({
  name: Joi.string().min(nameLen).required(),
  quantity: Joi.number().min(1).required(),
});

const create = async (name, quantity) => {
  const { error } = valid.validate({ name, quantity });

  if (error) { 
    return {status: 422, code: 'invalid_data', error};
  };

  const all = await getAll();
  const exists = all.some(product => product.name === name);

  if (exists) {
    return {
      status: 422, code: 'invalid_data', error: { message: 'Product already exists' }
    };
  }

  const newProduct = Product.create(name, quantity);

  return newProduct;
};

const getAll = async () => {
  const products = await Product.getAll();

  return products;
};

const getById = async (id) => {
  const product = await Product.getById(id);

  if (!product) {
    return {
      status: 422, code: 'invalid_data', error: { message: 'Wrong id format' }
    };
  }

  return product;
};

const update = async(id, name, quantity) => {
  const { error } = valid.validate({ name, quantity });

  if (error) { 
    return {status: 422, code: 'invalid_data', error};
  };

  const updateProduct = await Product.update(id, name, quantity);

  return updateProduct;
};


module.exports = {
  create,
  getAll,
  getById,
  update
};
