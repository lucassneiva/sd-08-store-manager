const ProductsService = require('../services/Products');

const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.create({ name, quantity });
  if (result.err) return next(result);
  res.status(CREATED).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductsService.getById(id);
  if (result.err) return next(result);
  res.json(result);
};

const getAll = async (_req, res) => {
  const result = await ProductsService.getAll();
  res.json({ products: result });
};

module.exports = {
  create,
  getById,
  getAll
};
