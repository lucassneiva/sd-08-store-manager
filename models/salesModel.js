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

module.exports = {
  createSales,
  getAllSales,
};
