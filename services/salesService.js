const salesModel = require('../models/salesModel');
const { ObjectId } = require('bson');

const QUANTIDADE_MINIMA = 0;

const validarItensSold = async ({quantity}) => {
  if(quantity <= QUANTIDADE_MINIMA || typeof quantity !== 'number')
    throw new Error('Wrong product ID or invalid quantity');
};

const cadastraVenda = async (sale) => {
  const valido = await validarItensSold(sale[0]);
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
// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
const atualizarVendas = async (sale) => {
  for (const itenSold of sale.itensSold){
    await validarItensSold(itenSold);
  }
  const vendaAtualizada = salesModel.atualizarVendas(sale);
  return vendaAtualizada;
};

const deletarVendaPorId = async (id) => {
  if (!ObjectId.isValid(id))
    throw new Error('Wrong sale ID format');
  const deletaVenda = await salesModel.deletarVendaPorId(id);
  return deletaVenda;
};

module.exports = {
  cadastraVenda,
  listarVendas,
  buscarVendaPorId,
  atualizarVendas,
  deletarVendaPorId,
};