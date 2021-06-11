const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const saleById = await db.collection('sales').findOne(ObjectId(id));
  return saleById;
};

const addSale = async (sales) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sales });
  return newSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
};
