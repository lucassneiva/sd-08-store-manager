const rescue = require('express-rescue');
const service = require('../services/Products');
const productSchema = require('../schemas/ProductSchema');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res, next) => {

  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;

  const product = await service.create({ name, quantity });

  if (product.error) return next(product.error);

  res.status(CREATED).json(product);
});

const findAll = rescue(async (_, res, next) => {
  const products = await service.findAll();

  if (products.error) return next(products.error);

  res.status(OK).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await service.findById(id);

  if (product.error) return next(product.error);

  res.status(OK).json(product);

});

const update = rescue(async (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await service.update({ id, name, quantity });

  if (product.error) return next(product.error);

  res.status(OK).json(product);
});

module.exports = {
  create,
  findAll,
  findById,
  update
};