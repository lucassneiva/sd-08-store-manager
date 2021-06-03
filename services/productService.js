const productModel = require('../models/productModel');

const CARACTERES_MINIMO = 5;
const QUANTIDADE_MINIMA = 0;

const validar = async (produto) => {
  const {name, quantity} = produto;
  if(name.length < CARACTERES_MINIMO)
    throw new Error('"name" length must be at least 5 characters long');
  if(typeof quantity === 'string')
    throw new Error('"quantity" must be a number');
  if(quantity <= QUANTIDADE_MINIMA)
    throw new Error('"quantity" must be larger than or equal to 1');

  const produtoBuscado = await productModel.buscarProdutoPorNome(produto);
  if(produtoBuscado)
    throw new Error('Product already exists');
};

const criar = async (produto) => {
  await validar(produto);
  const result = await productModel.cadastrarProduto(produto);

  return result;
};

module.exports = {
  validar,
  criar,
};