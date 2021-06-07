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

const atualizarVendas = async (sale) => {
  const db = await connection();
  await db
    .collection('sales')
    .updateOne({ _id: ObjectId(sale.id)}, { $set: { itensSold: sale.itensSold } });
  return buscarVendaPorId(sale.id);
};

const deletarVendaPorId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const vendaId = await buscarVendaPorId(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return vendaId;
};

module.exports = {
  cadastraVenda,
  listarVendas,
  buscarVendaPorId,
  atualizarVendas,
  deletarVendaPorId,
};