const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (products) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({itensSold: products})
      .then(result => result.ops[0]));
};

const searchById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id))
      .then(result => result));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray()
      .then(result => result));
};

module.exports = {
  create,
  searchById,
  getAll,
};
