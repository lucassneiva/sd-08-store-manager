const ProductSchema = require('../schema/ProductSchema');
const ProductModel = require('../models/productsModel');

const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const validateIfNameExists = async (req, res, next) => {
  const { name } = req.body;

  const getAllProducts = await ProductModel.getAll('products');
  const filterName = getAllProducts.filter((product) => product.name === name);

  if (filterName.length !== ZERO) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  const validations = ProductSchema.validate(name, quantity);
  
  if (validations.err) {
    return res.status(validations.code).json({ err: validations.err });
  }
  next();
};

module.exports = {
  validateIfNameExists,
  validateProduct,
};
