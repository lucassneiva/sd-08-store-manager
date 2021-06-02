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
  return db.collection('sales').findOne(ObjectId(id));
};

const addSale = async (productId, quantity) => {
  const db = await connection();
  const sale = await db.collection('sales').insertOne({ productId, quantity });
  return sale;
};

const deleteId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await getSaleById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const update = async (id, productId, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } });
  if (!sale) return addSale(productId, quantity);
  return { id, productId, quantity };
};

module.exports = {
  addSale,
  getAll,
  getSaleById,
  update,
  deleteId,
};
