const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getDbCollection = async (db) => {
  return connection()
    .then((db) => db.collection('products'));
};

const findProductByName = async (name) => {
  return getDbCollection()
    .then((collection) => collection.findOne({ name }));
};

const addProduct = async (name, quantity) => {
  return getDbCollection()
    .then((collection) => collection.insertOne({ name, quantity }));
};

const getProducts = async () => {
  return getDbCollection()
    .then((collection) => collection.find().toArray());
};
const getProductById = async (id) => {
  return getDbCollection()
    .then((collection) => collection.findOne(ObjectId(id)));
};

module.exports = {
  findProductByName,
  addProduct,
  getProducts,
  getProductById,
};
