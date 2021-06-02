const service = require('../services/productService');

const OK = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(CREATED).json(newProduct);
};

const readAll = async (_req, res, _next) => {
  const all = await service.readAll();

  res.status(OK).json(all);
};

const readById = async (req, res, next) => {
  const { id } = req.params;

  const product = await service.readById(id);

  if (product.error) return next(product);
  
  res.status(OK).json(product);
};

module.exports = {
  create,
  readAll,
  readById
};
