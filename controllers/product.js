const Product = require('../services/product');

const status = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const otherProduct = await Product.create(name, quantity);

  if (otherProduct.error) return next(otherProduct);

  res.status(CREATED).json(otherProduct);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.getById(id);

  if (product.error) return next(product);

  res.status(status).json(product);
};

const getAll = async (_req, res) => {
  const all = await Product.getAll();

  res.status(status).json({ products: all });
};

module.exports = {
  create,
  getAll,
  getById,
};
