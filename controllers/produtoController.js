const rescue = require('express-rescue');

const {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
} = require('../services/produtoServices');

const DZU = 201;
const DOO = 200;

const getAllProducts = rescue(async (_req, res) => {
  const products = await getAllProdutos();
  res.status(DOO).json({ products });
});

const addProducts = rescue(async (req, res) => {
  const produto = await addProdutos(req.body);
  res.status(DZU).json(produto);
});

const getByIdProducts = rescue(async (req, res) => {
  const products = await getByIdProdutos(req.params);
  res.status(DOO).json(products);
});

module.exports = {
  getAllProducts,
  addProducts,
  getByIdProducts,
};
