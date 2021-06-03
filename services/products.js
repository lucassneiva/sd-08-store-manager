const productsModel = require('../models/products');
const MIN_CHARACTERS = 5;
const MIN_QUANTITY = 0;

const isValid = async (name, quantity) => {
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

module.exports = {
  isValid,
};
