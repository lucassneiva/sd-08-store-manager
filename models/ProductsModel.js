const connection = require('./connection');

const { ObjectId } = require('mongodb');

const create = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((data) => {
      const [result] = data.ops;
      return result;
    });

const getAll = () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((data) => data);
};

const getById = (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

module.exports = {
  create,
  getAll,
  getById
};
