const { addProduct } = require('../services/products');
const { getAllProductsDB, getProductByIdDB } = require('../models/products');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const postProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const result = await addProduct(name, quantity);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }
    
    return res
      .status(HTTP_STATUS_CREATED)
      .send(result);
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getProducts = async (_req, res) => {
  try {
    const products = await getAllProductsDB();
    return res
      .status(HTTP_STATUS_OK)
      .send(products);
    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdDB(req.params.id);

    if (product.err) {
      const { status, ...rest } = product;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(product);
    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

module.exports = {
  postProduct,
  getProducts,
  getProductById,
};
