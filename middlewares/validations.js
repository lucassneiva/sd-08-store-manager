const { getAllProducts } = require('../models/productModel');

const UNPROCESSABLE_ENTITY = 422;

const validName = async (req, res, next) => {
  const { name } = req.body;
  const MIN_LENGTH = 5;
  if(name.length < MIN_LENGTH) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  const products = await getAllProducts();
  const duplicatedProduct = products.find((product) => product.name === name);
  if(duplicatedProduct) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const ValidQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  const MIN_QUANTITY = 1;
  if(quantity < MIN_QUANTITY) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  if(typeof quantity != 'number') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

module.exports = {
  validName,
  ValidQuantity
};