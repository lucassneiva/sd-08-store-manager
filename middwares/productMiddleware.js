const ProductSchema = require('../schemas/productSchema');
const ProductModel = require('../models/product');

const UNPROCESSABLE_ENTITY = 422;


const validateIfNameExists = async (req, res, next) => {
  const { name } = req.body;

  const getAllProducts = await ProductModel.getAllProducts('products');
  const findName = getAllProducts.some((product) => product.name === name);

  if (findName) {
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
