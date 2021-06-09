const rescue = require('express-rescue');
const products = require('../services/products');

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201= 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

// CREATE ----------------------------------------
const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, message, product } = await products.create(name, quantity);
  if (message) {
    return res.status(STATUS_422).send({ err: { status: status, message: message } });
  };
  res.status(STATUS_201).send(product);
};

// GETALL ------------------------------------------
const getAll = async (_req, res) => {
  const products = await products.getAll();
  return res.status(STATUS_200).json(products);
};

// GETBYID -------------------------------------------
const getById = async (req, res) => {
  const { id } = req.params;
  const product = await products.getById(id);
  if (product.err) res.status(STATUS_422).json(product);
  return res.status(STATUS_200).json(product);
};

// UPDATEBYID -----------------------------------------
const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const product = await Products.updateById(id, updatedProduct) ;
  if (product.err) res.status(STATUS_422).json(product);
  return res.status(STATUS_200).json(product);
};

// DELETEBYID -----------------------------------------
const deleteById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.deleteById(id);
  if (product.err) {
    return res.status(STATUS_422).json(product);
  }
  return res.status(STATUS_200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
