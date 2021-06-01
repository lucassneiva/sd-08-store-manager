const { productsServices } = require('../services');

const CREATE = 201;
const UNPROCESSABLE = 422;
const CODE_INVALID = 'invalid_data';

const productCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsServices.createProduct(name, quantity);
    res.status(CREATE).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

module.exports = {
  productCreate,
};