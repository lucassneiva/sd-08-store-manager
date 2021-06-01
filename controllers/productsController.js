const ProductsService = require('../services/productsService');

const created = 201;
const ok = 200;

const newProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.newProduct({ name, quantity });
  if (result.err) return next(result.err);
  res.status(created).json(result);
};

const getAllProducts = async (req, res, next) => {
  const result = await ProductsService.getAllProducts();
  res.status(ok).json(result);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductsService.getProductById(id);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const newProductInfo = req.body;
  const result = await ProductsService.updateProductById(id, newProductInfo);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

const deleteProductById = async (req, res , next) => {
  const { id } = req.params;
  const result = await ProductsService.deleteProductById(id);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

module.exports = {
  newProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};