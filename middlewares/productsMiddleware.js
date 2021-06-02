const { isValid, messageError } = require('../schemas/productsSchemas');
const ProductModel = require('../models/productModel');

const ZERO = 0;
const CODE_422 = 422;

const validateProduct = (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    isValid(name, quantity);
    next();
  } catch (error) {
    const message = messageError(error.message);
    res.status(CODE_422).json(message);
  }
};

const validateIfNameExists = async (req, res, next) => {
  const { name } = req.body;

  const getAllProducts = await ProductModel.getAllProducts('products');
  const filterName = getAllProducts.products.filter((product) => product.name === name);

  if (filterName.length !== ZERO) {
    return res.status(CODE_422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

module.exports = {
  validateProduct,
  validateIfNameExists,
};
