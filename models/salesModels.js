const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  const db = await connection();
  const saleById = await db.collection('sales').findOne(ObjectId(id));
  return saleById;
};

const addSale = async (sales) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sales });
  return newSale.ops[0];
};

const updateSale = async (id, productId, quantity) => {
  const db = await connection();
  return await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } });
};

const deleteSale = async (id) => {
  const db = await connection();
  const deletedSale = await getSaleById(id);
  db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
