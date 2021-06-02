const productModel = require('../models/productModel');

const CARACTERES_MINIMO = 5;
const QUANTIDADE_MINIMA = 0;

const validar = ({name, quantity}) => {
  if(name.length < CARACTERES_MINIMO)
    throw new String('"name" length must be at least 5 characters long');
  if(typeof quantity === 'string')
    throw new String('"quantity" must be a number');
  if(quantity <= QUANTIDADE_MINIMA)
    throw new String('"quantity" must be larger than or equal to 1');
  
  return null;
};

const criar = async (produto) => {

  const erro = validar(produto);
  if(erro) return erro;

  const produtoBuscado = await productModel.buscarProdutoPorNome(produto);

  if(produtoBuscado)
    throw new String('Product already exists');

  const result = await productModel.cadastrarProduto(produto);

  return result;
};

module.exports = {
  validar,
  criar,
};