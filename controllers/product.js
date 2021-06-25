const Product = require('../services/product');

const status = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const otherProduct = await Product.create(name, quantity);

  if (otherProduct.error) return next(otherProduct);

  res.status(CREATED).json(otherProduct);
};

const getAll = async (req, res, next) => {
  const all = await Product.getAll();

  res.status(status).json(all);
};

module.exports = {
  create,
  getAll
};
