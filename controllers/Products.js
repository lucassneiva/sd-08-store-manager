const express = require('express');
const services = require('../services/Products');

const { status } = require('../schemas/status');
const { validateName, validateQuantity } = require('../middlewares/ProductsValidation');

const routes = express.Router();

routes.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await services.create(name, quantity);
  if (createdProduct.isError) return res.status(createdProduct.status)
    .json({ err: { code: createdProduct.code, message: createdProduct.message} });
  return res.status(status.created).json(createdProduct);
});

module.exports = routes;
