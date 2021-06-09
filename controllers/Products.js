const rescue = require('express-rescue');
const service = require('../services/Products');
const productSchema = require('../schemas/ProductSchema');

const CREATED = 201;

const create = rescue(async (req, res, next) => {

  const { error } = productSchema.validate(req.body);

  if(error) return next(error);

  const { name, quantity } = req.body;

  const product = await service.create({ name, quantity });

  if (product.error) return next(product.error);

  res.status(CREATED).json(product);
});

module.exports = {
  create
};