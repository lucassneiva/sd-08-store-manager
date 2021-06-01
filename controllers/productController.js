const ProductsService = require('../services/productService');

const UNPROCESSABLE_ENTITY = 422;
const CREATED = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService
    .create({ name, quantity });

  let statusCode = CREATED;

  if (product.hasOwnProperty('err')) statusCode = UNPROCESSABLE_ENTITY;

  res
    .status(statusCode)
    .json(product);
};

module.exports = {
  create,
};