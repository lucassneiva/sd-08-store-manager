const { getAll, add } = require('../models/produtosModel');

const getAllProtudos = async () => {
  const produtos = await getAll();
  return produtos;
};

const addProtudos = async ({ name, quantity }) => {
  const produtoInserido = await add({ name, quantity });
  return produtoInserido;
};

module.exports = {
  getAllProtudos,
  addProtudos,
};
