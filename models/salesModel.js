const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const addSale = async (sales) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne({ itensSold: sales });
  return sale.ops[0];
};

const deleteId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await getSaleById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const update = async (id, sales) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { sales } });
  if (!sale) return addSale(sales);
  return { id, productId, quantity };
};

module.exports = {
  addSale,
  getAll,
  getSaleById,
  update,
  deleteId,
};
