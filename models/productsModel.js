const connect = require('./mongoConnection');

collection = 'products';

const getProductByName = async (name) => {
  return connect().then((db) => db.collection(collection).find({ name }).toArray());
};

const getProducts = async () => {
  return connect().then((db) => db.collection(collection).find().toArray());
};

const getProductById = async (_id) => {
  return connect()
    .then((db) => db.collection(collection).findOne({ _id }));
};

const createProduct = async (name, quantity) => connect()
  .then((db) => db.collection(collection).insertOne({name, quantity}))
  .then((result) => result.ops[0]);

module.exports = {
  createProduct,
  getProductByName,
  getProducts,
  getProductById
};