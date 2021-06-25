const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (items) => {
  const db = await connection();

  const otherSale = await db.collection('sales').insertOne({ itensSold: items });

  return otherSale.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

module.exports = {
  create,
  getAll,
  getById
};