const Products = require('../services/ProductsService');
const rescue = require('express-rescue');

const CODE_422 = 422;
const CODE_200 = 200;
const CODE_201 = 201;

const getAll = rescue (async (req, res) => {
  const products = await Products.getAll();

  res.status(CODE_200).json(products);
});

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, createProduct } = await Products.create(name, quantity);

  if(message) return res.status(CODE_422).send({err: {code, message}});

  res.status(CODE_201).send(createProduct);
};

module.exports = {
  getAll,
  create,
};
