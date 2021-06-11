const Products = require('../models/Products');
const { ObjectId } = require('mongodb');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const productIsValid = ({ name, quantity }) => {
  if (typeof name !== 'string'|| name.length < MIN_NAME_LENGTH) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };
  if (typeof quantity !== 'number') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  };
  if (Number(quantity) < MIN_QUANTITY) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  };
  return true;
};

const getAll = async () => {
  const products = await Products.getAll();
  return {
    products
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const product = await Products.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const product = await Products.findByName(name);
  if (product) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  const productValid = productIsValid({ name, quantity });
  if (typeof productValid === 'object') return productValid;
  const { insertedId } = await Products.create(name, quantity);
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const update = async (id, product) => {
  const productValid = productIsValid(product);
  if (typeof productValid === 'object') return productValid;
  await Products.update(id, product);
  return {
    _id: id,
    ...product,
  };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const deletedProduct = await Products.getById(id);
  await Products.remove(id);
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};