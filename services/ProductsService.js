const ProductsModel = require('../models/ProductsModel');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 0;

const addProduct = async (product) => {

  const { name, quantity } = product;

  const productAlreadyExists = await ProductsModel.findProduct(product);

  if (typeof name !== 'string' || name.length <= MIN_NAME_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  
  if (quantity <= MIN_QUANTITY) {
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

  if (productAlreadyExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductsModel.addProduct(product);
};


module.exports = {
  addProduct,
};