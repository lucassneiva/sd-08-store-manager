const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (items) => {
  const db = await connection();

  const newSale = await db.collection('sales').insertOne({ itensSold: items });

  return newSale.ops[0];
};

const readAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const readById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

module.exports = {
  create,
  readAll,
  readById
};