const connect = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const productsCollection = await connect()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const getAll = async () => connect()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  await ObjectId.isValid(id);
  const people = connect().then((db) => db.collection('products').find(ObjectId(id)));
  return people;
};

const getByName = async (name) => connect()
  .then((db) => db.collection('products').find({ name }));

module.exports = {
  create,
  getAll,
  getById,
  getByName,
};
