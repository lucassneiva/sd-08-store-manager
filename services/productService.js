const productModel = require('../models/productModel');
const { ObjectId } = require('bson');
const CARACTERES_MINIMO = 5;
const QUANTIDADE_MINIMA = 0;

const validarPropriedades = async (produto) => {
  const {name, quantity} = produto;
  if(name.length < CARACTERES_MINIMO)
    throw new Error('"name" length must be at least 5 characters long');
  if(typeof quantity === 'string')
    throw new Error('"quantity" must be a number');
  if(quantity <= QUANTIDADE_MINIMA)
    throw new Error('"quantity" must be larger than or equal to 1');
};

const validarExistencia = async (produto) => {
  const produtoBuscado = await productModel.buscarProdutoPorNome(produto);
  if(produtoBuscado)
    throw new Error('Product already exists');
};

const validarInsercao = async (produto) => {
  await validarPropriedades(produto);
  await validarExistencia(produto);
};

const validarAtualizacao = async (produto) => {
  await validarPropriedades(produto);
};

const criar = async (produto) => {
  await validarInsercao(produto);
  const result = await productModel.cadastrarProduto(produto);

  return result;
};

const listarProdutos = async () => {
  const listaProduto = await productModel.listarProdutos();
  return listaProduto;
};

const buscarProdutoPorId = async (id) => {
  if (!ObjectId.isValid(id))
    throw new Error('Wrong id format');
  const produtosId = await productModel.buscarProdutoPorId(id);
  return produtosId;
};

const atualizarProdutoPorId = async (produto) => {
  await validarAtualizacao(produto);
  return await productModel.atualizarProdutoPorId(produto);
};

const deletarProdutoPorId = async (id) => {
  if (!ObjectId.isValid(id))
    throw new Error('Wrong id format');
  return productModel.deletarProdutoPorId(id);
};

module.exports = {
  listarProdutos,
  criar,
  buscarProdutoPorId,
  atualizarProdutoPorId,
  deletarProdutoPorId,
};