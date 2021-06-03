const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity })
      .then(result => result.ops[0]));
};

const searchByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name: name })
      .then(result => result));
};

const searchById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id))
      .then(result => result));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray()
      .then(result => result));
};

module.exports = {
  create,
  searchByName,
  searchById,
  getAll,
};
