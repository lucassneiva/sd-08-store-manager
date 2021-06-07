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

const getById = async (id) => connect()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const getByName = async (name) => connect()
  .then((db) => db.collection('products').findOne({ name }));

const update = async (_id, name, quantity) => {
  const productsCollection = await connect()
    .then((db) => db.collection('products'));
  
  await productsCollection.updateOne({ _id: ObjectId(_id) },
    { $set: { name, quantity } });
  
  return {
    _id,
    name,
    quantity,
  };
};

const erase = async (_id) => {
  const productsCollection = await connect()
    .then((db) => db.collection('products'));
  
  await productsCollection.deleteOne({ _id: ObjectId(_id) });
  
  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  getByName,
  update,
  erase,
};
