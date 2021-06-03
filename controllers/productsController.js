const { productsServices } = require('../services');
const {
  createProduct,
  readProducts,
  readProductsById,
  updateProductById,
} = productsServices;

const CREATED = 201;
const UNPROCESSABLE = 422;
const CODE_INVALID = 'invalid_data';
const SUCESS = 200;

const productCreate = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await createProduct(name, quantity);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productsReader = async (_req, res, next) => {
  try {
    const result = await readProducts();
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

const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await readProductsById(id);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    return res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await updateProductById(id, name, quantity);
    if (result.err) {
      return res.status(UNPROCESSABLE).json(result);
    }
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  productCreate,
  productsReader,
  productById,
  productUpdate,
};