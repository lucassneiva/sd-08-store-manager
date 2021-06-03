const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0])
    .catch((err) => err);
};

module.exports = {
  getProducts,
  createProduct,
};
