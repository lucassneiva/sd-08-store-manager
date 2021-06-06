const { ObjectId } = require('bson');
const connection = require('./connection');

const cadastraVenda = async (sale) => {
  const db = await connection();
  await db.collection('sales').insertOne({ itensSold: sale });
  const venda = await db.collection('sales').find().toArray();
  return venda[0];
};

module.exports = {
  cadastraVenda,
};