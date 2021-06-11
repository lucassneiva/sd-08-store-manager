const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold })
    );

  return { _id: insertedId, itensSold };
};

const findAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  if (!sales) return null;

  return sales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!sale) return null;

  return sale;
};

module.exports = {
  create,
  findAll,
  findById
};