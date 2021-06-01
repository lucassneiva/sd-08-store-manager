const ProductsModel = require('../models/productsModel');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const isProductValid = ({ name, quantity }) => {
  if (name.length < MIN_NAME_LENGTH || typeof name !== 'string') return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  };

  if(typeof quantity === 'string') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }
  };

  if(quantity < MIN_QUANTITY) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  } ;

  return null;
};

const findProductByName = async (name) => {
  const result = await ProductsModel.findProductByName(name);
  if(result) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };
  return null;
};

const newProduct = async ({ name, quantity }) => {
  const validationError = isProductValid({ name, quantity });
  if(validationError) return validationError;

  const productAlreadyExists = await findProductByName(name);
  if(productAlreadyExists) return productAlreadyExists;

  const result = await ProductsModel.newProduct({ name, quantity });
  return result;
};

module.exports = {
  newProduct,
};