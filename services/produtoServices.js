const {
  getAll,
  add,
  getById,
} = require('../models/produtosModel');

const QDD = 422;

const getAllProdutos = async () => {
  const produtos = await getAll();
  return produtos;
};

const addProdutos = async ({ name, quantity }) => {
  const produtoInserido = await add({ name, quantity });
  return produtoInserido;
};

const getByIdProdutos = async ({id}) => {
  const produto = await getById(id);
  return produto;
};

module.exports = {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
};
