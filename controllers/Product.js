const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const ProductService = require('../services/Product');

const CREATED = 201;

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.create({ name, quantity });
  if (!newProduct) throw boom.badData('Product already exists');
  res.status(CREATED).json(newProduct);
});

module.exports = {
  create,
};
