const { productsServices } = require('../services');

const CREATE = 201;
const UNPROCESSABLE = 422;
const CODE_INVALID = 'invalid_data';
const SUCESS = 200;

const productCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsServices.createProduct(name, quantity);
    res.status(CREATE).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      code: CODE_INVALID,
      message: error.message,
    });
  }
};

const productsReader = async (_req, res, next) => {
  try {
    const result = await productsServices.readProducts();
    res.status(SUCESS).json({
      products: result,
    });
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const productById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsServices.readProductsById(id);
    res.status(SUCESS).json(result);
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
  productsReader,
  productById,
};