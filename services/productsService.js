const {
  createProductModel,
  getAllProductsModel,
  getByIdProductsModel,
} = require('../models/productModel');

const productValidation = ({ name, quantity }) => {
  const LENGTH = 5;
  const MIN = 1;
  if (name.length < LENGTH) return ({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  });
  if (quantity < MIN) return ({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  });
  if (typeof quantity !== 'number') return ({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });
  return null;
};

const createProductService = async (name) => {
  const result = await createProductModel(name);
  if (result === 'not unique') return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  });
  return result;
};

const getAllProductsService = async () => {
  const products = await getAllProductsModel();
  return products;
};

const getByIdProductsService = async (id) => {
  const product = await getByIdProductsModel(id);
  if (!product) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  return product;
};

module.exports = {
  productValidation,
  createProductService,
  getAllProductsService,
  getByIdProductsService,
};
