const {
  getAllProducts,
} = require('../models/productsModels');

const UNPROCESSABLE_ENTITY = 422;
const NAME_LENGTH = 5;

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await getAllProducts();
  const findProduct = await allProducts.find((item) => item.name === name);
  if (findProduct !== undefined) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      });
  }
  if (name.length < NAME_LENGTH) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      });
  }
  next();
};

module.exports = nameValidation;
