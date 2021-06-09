const Products = require('../models/Products');

const UNPROCESSABLE_ENTITY = 422;

const create = async (product) => {

  const { name } = product;

  const productExists = await Products.findByName(name);

  if (productExists) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Product already exists'
      }
    };
  }

  return Products.create(product);
};

module.exports = {
  create
};