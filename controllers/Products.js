const express = require('express');
const services = require('../services/Products');

const { status } = require('../schema/status');
const { validateName, validateQuantity, validateId } =
 require('../middlewares/ProductsValidation');

const routes = express.Router();

routes.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await services.create(name, quantity);
  if (createdProduct.isError) return res.status(createdProduct.status)
    .json({ err: { code: createdProduct.code, message: createdProduct.message} });
  return res.status(status.created).json(createdProduct);
});

routes.get('/', async (_req, res) => {
  const products = await services.findAll();
  return res.status(status.OK).json({ products });
});

routes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const product = await services.findById(id);
  return res.status(status.OK).json(product);
});

routes.put('/:id', validateName, validateQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await services.updateById(id, name, quantity);
  return res.status(status.OK).json({ _id: id, name, quantity });
});

module.exports = routes;
