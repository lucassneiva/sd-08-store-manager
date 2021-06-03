const {
  getAll,
  add,
  getById,
} = require('../models/produtosModel');

const getAllProdutos = async () => {
  const produtos = await getAll();
  return produtos;
};

const addProdutos = async ({ name, quantity }) => {
  const produtoInserido = await add({ name, quantity });
  return produtoInserido;
};

const getByIdProdutos = async ({id}) => {
  // validar meu id 
  // se for null retorna obj
  const produto = await getById(id);
  console.log(produto);
  // if (produto === {}) {
  //   return err = { produto };
  // }
  return produto;
};

module.exports = {
  getAllProdutos,
  addProdutos,
  getByIdProdutos,
};
