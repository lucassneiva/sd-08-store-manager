const { getAll, add } = require('../models/produtosModel');

const getAllProdutos = async () => {
  const produtos = await getAll();
  return produtos;
};

const addProdutos = async ({ name, quantity }) => {
  const produtoInserido = await add({ name, quantity });
  return produtoInserido;
};

module.exports = {
  getAllProdutos,
  addProdutos,
};
