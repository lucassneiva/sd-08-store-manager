const rescue = require('express-rescue');
const Joi = require('joi');
const Sales = require('../services/sales');

const {
  SUCCESS, CREATED, NOT_FOUND, INVALID_DATA, MIN_STR_LENGTH
} = require('../constants');

const registerSale = rescue(async (req, res, next) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).strict().required(),
    })
  ).validate(req.body);

  if (error) {
    return res.status(INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  const product = await Sales.registerSales(req.body);

  if (product.error) return res.status(INVALID_DATA).json(product.error);

  return res.status(SUCCESS).json(product);
});

const getAllSales = rescue(async (req, res, next) => {
  const result = await Sales.getAllSales();

  if (result.error) return res.status(NOT_FOUND).json(result.error);

  return res.status(SUCCESS).json({ sales: result });
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const result = await Sales.getById(id);

  if (result.error) return res.status(NOT_FOUND).json(result.error);

  return res.status(SUCCESS).json(result);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).strict().required(),
    })
  ).validate(req.body);

  if (error) {
    return res.status(INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  const result = await Sales.updateById(id, req.body);

  // if (result.error) return res.status(NOT_FOUND).json(result.error);s

  return res.status(SUCCESS).json(result);
});

const deleteById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const saleToDelete = await Sales.deleteById(id);

  if (saleToDelete.error) return res.status(INVALID_DATA).json(saleToDelete.error);

  return res.status(SUCCESS).json(saleToDelete);
});


module.exports = {
  registerSale,
  getAllSales,
  getById,
  updateById,
  deleteById
};
