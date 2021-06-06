const { ObjectId } = require('bson');
const connection = require('./connection');

const cadastraVenda = async (sale) => {
  const db = await connection();
  await db.collection('sales').insertOne({ itensSold: sale });
  const venda = await db.collection('sales').find().toArray();
  return venda[0];
};

const listarVendas = async () => {
  const db = await connection();
  const listaVenda = await db.collection('sales').find().toArray();
  if(listaVenda) return listaVenda;
};

const buscarVendaPorId = async (id) => {
  const db = await connection();
  const venda = await db.collection('sales').findOne(new ObjectId(id));
  return venda;
};

module.exports = {
  cadastraVenda,
  listarVendas,
  buscarVendaPorId,
};