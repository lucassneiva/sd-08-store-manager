const ProductsService = require('../services/ProductsService');

const UNPROCESSABLE_ENTITY = 422;
const CREATED = 201;
const SUCCESS = 200;

const addProducts = async (req, res) => {
  const newProduct = req.body;
  
  const product = await ProductsService.addProduct(newProduct);
  
  if(product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }
  
  return res.status(CREATED).json(product);
};

const getAll = async (_req, res) => {

  const products = await ProductsService.getAll();

  return res.status(SUCCESS).json(products);
};

const getAllById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getAllById(id);

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }

  return res.status(SUCCESS).json(product);
};

module.exports = {
  addProducts,
  getAll,
  getAllById,
};
