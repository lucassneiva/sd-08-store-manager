const salesModel = require('../models/salesModel');

const QUANTIDADE_MINIMA = 0;

const validarVenda = async (quantity) => {
  if(quantity <= QUANTIDADE_MINIMA || typeof quantity !== 'number') {
    throw new Error('Wrong product ID or invalid quantity');
  }
  return undefined;
};

const cadastraVenda = async (sale) => {
  const valido = await validarVenda(sale[0].quantity);
  if (valido !== undefined) {
    throw new Error('Wrong product ID or invalid quantity');
  }
  return salesModel.cadastraVenda(sale);
};

module.exports = {
  cadastraVenda,
};