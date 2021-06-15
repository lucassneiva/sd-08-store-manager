const productService = require('../services/productService');

const CREATED_STATUS = 201;
const OK_STATUS = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  return res.status(CREATED_STATUS).send(newProduct);
};

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();
  return res.status(OK_STATUS).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  return res.status(OK_STATUS).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const put = await productService.updateProduct(id, name, quantity);
  return res.status(OK_STATUS).json(put);
};

module.exports = {
  create,
  getAll,
  getProductById,
  updateProduct,
};
