const connection = require('./connection');

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

module.exports = {
  findProductByName,
  addProduct,
};
