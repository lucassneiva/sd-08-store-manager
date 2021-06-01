const ProductsModel = require('../models/productsModel');

const UNPROCESSABLE_ENTITY = 422;
const FIVE_LENGTH = 5;
const ONE = 1;
const ZERO = 0;

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  const getAllProducts = await ProductsModel.getAll('products');
  const filterName = getAllProducts.filter((product) => product.name === name);

  if (filterName.length !== ZERO) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }

  if (name.length < FIVE_LENGTH) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if (typeof quantity === 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  if (quantity < ONE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  const product = await ProductsModel.addProduct(name, quantity);
  return product;
};

module.exports = {
  getAll,
  create,
};
