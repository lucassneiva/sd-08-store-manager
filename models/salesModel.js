const connection = require('./connection');

const SALES = 'sales';

const createSales = async (sales) => {
  const db = await connection();
  return db.collection(SALES).insertOne({ itensSold: sales });
};

const getAllSales = async () => {
  const db = await connection();
  return db.collection(SALES).find().toArray();
};

const getSaleById = async (id) => {
  const db = await connection();
  return db.collection(SALES).findOne({ _id: id });
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
