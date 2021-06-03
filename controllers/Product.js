const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const ProductService = require('../services/Product');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.create({ name, quantity });
  if (!newProduct) throw boom.badData('Product already exists');
  res.status(CREATED).json(newProduct);
});

const getAll = rescue(async (_req, res, _next) => {
  const result = await ProductService.getAll();
  res.status(OK).json(result);
});

const findById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await ProductService.findById(id);
  if (!result) throw boom.badData('Wrong id format');

  res.status(OK).json(result);
});

const update = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductService.update(id, { name, quantity });
  if (!product) throw boom.badData('Não é possivel atualizar produto com id inválido');

  res.status(OK).json(product);
});

const remove = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const removedProduct = await ProductService.remove(id);
  if (!removedProduct) throw boom.badData('Wrong id format');

  res.status(OK).json(removedProduct);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
