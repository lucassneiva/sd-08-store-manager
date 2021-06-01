const ProductsService = require('../services/productsService');

const created = 201;
const invalid_data = 422;

const newProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.newProduct({ name, quantity });
  if (result.err) return next(result.err);
  res.status(created).json(result);
};

module.exports = {
  newProduct,
};