const rescue = require('express-rescue');
const Joi = require('joi');
const Products = require('../services/products');

const { SUCCESS, CREATED, INVALID_DATA, MIN_STR_LENGTH } = require('../constants');

const createOne = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(MIN_STR_LENGTH).required(),
    quantity: Joi.number().min(1).strict().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const product = await Products.create(req.body);

  if (product.error) return res.status(INVALID_DATA).json(product.error);

  return res.status(CREATED).json(product);
});

const getAllProducts = rescue(async (req, res, next) => {
  const result = await Products.getAll();

  if (result.error) return res.status(INVALID_DATA).json(result.error);

  return res.status(SUCCESS).json({ products: result });
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await Products.getById(id);

  if (result.error) return res.status(INVALID_DATA).json(result.error);

  return res.status(SUCCESS).json(result);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = Joi.object({
    name: Joi.string().min(MIN_STR_LENGTH).required(),
    quantity: Joi.number().min(1).strict().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const result = await Products.updateById(id, req.body);

  return res.status(SUCCESS).json(result);
});

const deleteById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const productToDelete = await Products.deleteById(id);

  if (productToDelete.error) return res.status(INVALID_DATA).json(productToDelete.error);

  return res.status(SUCCESS).json(productToDelete);
});

module.exports = {
  createOne,
  getAllProducts,
  getById,
  updateById,
  deleteById,
};
