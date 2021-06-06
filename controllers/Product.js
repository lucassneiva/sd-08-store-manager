const rescue = require('express-rescue');
const Product = require('../services/Product');

const HTTP_OK = 200;
const HTTP_Created = 201;

const getAll = rescue(async (req, res) => {
  const products = await Product.getAll();

  res.status(HTTP_OK).json(products);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const productID = await Product.findById(id);

  if (productID.error) return next(productID);

  res.status(HTTP_OK).json(productID);
});

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await Product.create(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(HTTP_Created).json(newProduct);
});

module.exports = {
  getAll,
  findById,
  create,
};