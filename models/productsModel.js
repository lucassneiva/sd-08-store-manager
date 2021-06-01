const { ObjectID } = require('bson');
const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const result = await connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: result.insertedId,
    name,
    quantity
  };
};

const findByNameProduct = async (name) => {
  const result = await connect()
    .then((db) => db.collection('products').find({ name: name }).toArray());
  return result;
};

const getAllProducts = async () => {
  const result = await connect()
    .then((db) => db.collection('products').find().toArray());
  return result;
};

const findByIdProducts = async (id) => {
  const result = await connect()
    .then((db) => db.collection('products').find({ _id: ObjectID(id) }).toArray());
  return result;
};

module.exports = {
  addProduct,
  findByNameProduct,
  getAllProducts,
  findByIdProducts,
};
