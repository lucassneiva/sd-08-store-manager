const {
  getAll,
  add,
  getById,
  updateById,
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

const updateByIdProducts = async ({ id }, produto) => {
  const produtoAtualizdo = await updateById(id, produto);
  return produtoAtualizdo;
};

module.exports = {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
  updateByIdProducts,
};
