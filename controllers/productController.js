const rescue = require('express-rescue');
const productService = require('../services/productService');

const create = rescue(async(req, res, next) => {
  const { name, quantity } = req.body;
  const resultService = await productService.productCreate({
    name, quantity
  });
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const getById = rescue(async(req, res, next) => {
  const { id } = req.params;
  const resultService = await productService.getById(id);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const getAll = rescue(async(req, res, next) => {
  const resultService = await productService.getAll();
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const update = rescue(async(req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const resultService = await productService.update({ id, name, quantity });
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

const deleteProduct = rescue(async(req, res, next) => {
  const { id } = req.params;
  const resultService = await productService.deleteProduct(id);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleteProduct,
};
