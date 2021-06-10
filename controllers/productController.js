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
  
module.exports ={
  getAllProducts,
  createProducts,
};
