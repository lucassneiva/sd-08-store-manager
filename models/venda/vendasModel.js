const Connection = require('../connection');
const { ObjectId } = require('mongodb');

const cadatraVendaModel = async (itensSold) => {
  const db = await Connection();
  const venda = await db.collection('sales').insertOne({ itensSold });
  return venda.ops[0];
};

const getAllVendasModel = async () => {
  const db = await Connection();
  const vendas = await db.collection('sales').find({}).toArray();
  return vendas;
};

const getByIdVendaModel = async (ids) => {
  if (!ObjectId.isValid(ids)) return null;
  const db = await Connection();
  const result = await db.collection('sales').findOne({_id: ObjectId(ids) });
  return result;
};

module.exports = {
  cadatraVendaModel,
  getAllVendasModel,
  getByIdVendaModel,
};
