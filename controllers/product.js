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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = await Product.update(id, name, quantity);

  if (updateProduct.error) return next(updateProduct);

  res.status(status).json(updateProduct);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.deleteById(id);

  if (product.error) {
    return next(product);
  }

  return res.status(status).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};
