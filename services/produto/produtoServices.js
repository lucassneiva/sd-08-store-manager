const {
  getAll,
  add,
  getById,
  updateById,
  deleteById,
} = require('../../models/produto/produtosModel');

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

const deleteByIdProducts = async ({ id }, produto) => {
  const produtoAtualizdo = await deleteById(id, produto);
  return produtoAtualizdo;
};

module.exports = {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
  updateByIdProducts,
  deleteByIdProducts,
};
