const rescue = require('express-rescue');

const {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
  updateByIdProducts,
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
  const produto = await getByIdProdutos(req.params);
  res.status(DOO).json(produto);
});

const updateById = rescue(async (req, res) => {
  const id = req.params;
  const body = req.body;
  const produto = await updateByIdProducts(id, body);
  res.status(DOO).json(produto);
});

module.exports = {
  getAllProducts,
  addProducts,
  getByIdProducts,
  updateById,
};
