const rescue = require('express-rescue');
const productsServices = require('../services/productsServices');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const Unprocessable_Entity_Status = 422;

const insertAProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await productsServices.insertAProduct(name, quantity);
  if (result.err) return next(result);
  res.status(CREATED_STATUS).json(result);
});

const getAllProducts = rescue(async (_req, res, _next) => {
  const products = await productsServices.getAllProducts();
  res.status(OK_STATUS).json({ products });
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await productsServices.getProductById(id);
  if(result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

module.exports = {
  insertAProduct,
  getAllProducts,
  getProductById,
};
