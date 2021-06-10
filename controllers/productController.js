const rescue = require('express-rescue');
const service = require('../services/product');

const OK = 200;
const CREATED = 201;

const getAllProducts = rescue(async (_req, res) => {
  const products = await service.getAll();
  res.status(OK).json(products);
});

const createProducts = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const createdProduct = await service.add(name, quantity);
  createdProduct.error && next(createdProduct);
  res.status(CREATED).json(createdProduct);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const productId = await service.getById(id);

  productId.error && next(productId);

  res.status(OK).json(productId);
});

const updateProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await service.update(id, name, quantity);
  updatedProduct.error && next(updatedProduct);
  res.status(OK).json(updatedProduct);
});

  
module.exports ={
  getAllProducts,
  createProducts,
  getById,
  updateProduct,
};
