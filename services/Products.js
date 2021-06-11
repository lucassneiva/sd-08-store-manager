const Products = require('../models/Products');

const create = async (product) => {
  const { name } = product;

  const productExists = await Products.findByName(name);

  if (productExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }

  return Products.create(product);
};

const findAll = async () => Products.findAll();

const findById = async (id) => {
  const product = await Products.findById(id);

  if (!product) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return product;
};

const update = async (product) => Products.update(product);

const remove = async (product) => {
  const removedProduct = await Products.remove(product);

  if (!removedProduct) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return removedProduct;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};