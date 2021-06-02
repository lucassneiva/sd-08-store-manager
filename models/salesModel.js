const { ObjectId } = require('bson');
const connection = require('./connection');

const createSale = async (sale) => {
  const db = await connection();
  await db.collection('sales').insertOne({ itensSold: sale });
  const result = await db.collection('sales').find().toArray();
  return result[0];
};

// const findSale = async (sale) => {
//   const db = await connection();
//   const sales = await db.collection('sales').findOne({ itensSold: sale });
//   if (sales) return sales;
// };


module.exports = { createSale, findSale };
