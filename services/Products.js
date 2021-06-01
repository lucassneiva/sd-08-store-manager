const Products = require('../models/Products');

const MIN_NAME_LEN = 5;
const MIN_QNT = 0;

const add = async (product) => {
  const { name, quantity } = product;

  const existingProduct = await Products.findProduct(product);

  if (typeof name !== 'string' || name.length <= MIN_NAME_LEN) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (quantity <= MIN_QNT) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!Number.isInteger(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return Products.add(product);
};

const getAll = async () => {
  const products = await Products.getAll();

  return { products };
};

const getById = async (id) => {
  const product = await Products.getById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

module.exports = {
  add,
  getAll,
  getById,
};
