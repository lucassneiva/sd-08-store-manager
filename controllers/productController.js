const productsServices = require('../services/productsService');

const error = 422;
const created = 201;
const ok = 200;

const getAllProducts = async (_req, res) => {
  const result = await productsServices.getAllProducts();
  if (result.err) {
    return res.status(error).json(result);
  }
  return res.status(ok).json(result);
};

const findProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.findProduct(id);
  if (result.err) {
    return res.status(error).json(result);
  }
  res.status(ok).json(result);
};

const createProduct = async (req, res) => {
  const product = req.body;
  const validation = productsServices.validateProduct(product);
  if (validation) {
    return res.status(error).json(validation);
  }
  const result = await productsServices.createProduct(product);
  if (result.err) {
    return res.status(error).json(result);
  }
  res.status(created).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  const validation = productsServices.validateProduct(newProduct);
  if (validation) {
    return res.status(error).json(validation);
  }
  const result = await productsServices.updateProduct(id, newProduct);
  res.status(ok).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.deleteProduct(id);
  if (result.err) {
    res.status(error).json(result);
  }
  res.status(ok).json(result);
};

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
