const ProductsService = require('../services/productsService');

const created = 201;
const invalid_data = 422;
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

module.exports = {
  newProduct,
  getAllProducts,
  getProductById,
};