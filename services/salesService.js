const salesModel = require('../models/salesModel');
const { ObjectId } = require('bson');

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

const listarVendas = async () => {
  const listaVenda = await salesModel.listarVendas();
  return listaVenda;
};

const buscarVendaPorId = async (id) => {
  if (!ObjectId.isValid(id))
    throw new Error('Sale not found');
  const vendaId = await salesModel.buscarVendaPorId(id);
  if(!vendaId)
    throw new Error('Sale not found');
  return vendaId;
};

module.exports = {
  cadastraVenda,
  listarVendas,
  buscarVendaPorId,
};