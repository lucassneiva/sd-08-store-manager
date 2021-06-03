const productsModel = require('../models/products');
const MIN_CHARACTERS = 5;
const MIN_QUANTITY = 0;
const MIN_ID_LENGTH = 16;
const MAX_ID_LENGTH = 24;

const userIsValid = async (name, quantity) => {
  if (name.length < MIN_CHARACTERS) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const products = await productsModel.getProducts();
  if (products.some((product) => product.name === name)) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }
  if (quantity <= MIN_QUANTITY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }

  return await productsModel.createProduct(name, quantity);
};

const idIsValid = async (id) => {
  if (id.length === MIN_ID_LENGTH || id.length === MAX_ID_LENGTH) {
    const product = await productsModel.findProduct(id);
    if (product === null) {
      return {
        err: { code: 'invalid_data', message: 'Wrong id format' },
      };
    }
    return product;
  }

  return {
    err: { code: 'invalid_data', message: 'Wrong id format' },
  };
};

module.exports = {
  userIsValid,
  idIsValid,
};
