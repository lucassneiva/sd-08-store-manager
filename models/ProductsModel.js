const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const add = async (name, quantity) => connect().then(async (db) => {
  const product = await db.collection('products').insertOne({
    name: name, quantity: quantity
  });
  return product.ops[0];
});

module.exports = { getAll, add, getById };