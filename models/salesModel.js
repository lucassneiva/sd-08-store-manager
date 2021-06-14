const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllTheSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const addSaleToDB = async (product) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne({ itensSold: product });
  return { _id: sale.insertedId, ...sale.ops[0] };
};

const deleteSaleById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await getSaleById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const updateOrCreateSale = async (id, sales) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db
    .collection('sales')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold: sales } },
      { returnOriginal: false });
  // Solução incrível encontrada no projeto do Tiago Bovolin, estava morrendo aqui e isso me ajudou muito.
  const { value } = sale;
  if (!sale) return addSale(sales);
  return { id, value };
};

module.exports = {
  addSaleToDB,
  getAllTheSales,
  getSaleById,
  updateOrCreateSale,
  deleteSaleById,
};
