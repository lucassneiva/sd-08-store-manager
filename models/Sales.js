const connection = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (soldItems) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: soldItems }))
    .then((result) => result.ops[0]);
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  try {
    const sales = await connection()
      .then((db) => db.collection('sales').findOne(new ObjectId(id)));

    if (!sales) return null;

    return sales;
  } catch (err) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
};
