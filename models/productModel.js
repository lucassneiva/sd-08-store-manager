const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

const create = (name, quantity) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne({
      name,
      quantity,
    }));
};

const getAll = () => {
  return result = connection()
    .then((db) => db.collection(PRODUCTS).find().toArray());
};

const getProductByName = (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name }));
};

const getProductById = (id) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ _id: id }));
};

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).updateOne(
      { _id: id },
      { $set: { name, quantity } },
    ))
    .then(() => ({ _id: id, name, quantity }));
};

module.exports = {
  create,
  getAll,
  getProductByName,
  getProductById,
  updateProduct,
};
