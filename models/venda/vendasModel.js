const Connection = require('../connection');
const { ObjectId } = require('mongodb');

const QDD = 422;

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

const updateVendasModel = async (id, updateSale) => {
  const db = await Connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updateSale } });
  const result = await getByIdVendaModel(id);
  return result;
};

const deleteVendasModel = async (id) => {
  const result = await getByIdVendaModel(id);
  const db = await Connection();
  await db.collection('sales')
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  cadatraVendaModel,
  getAllVendasModel,
  getByIdVendaModel,
  updateVendasModel,
  deleteVendasModel,
};
