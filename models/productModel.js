const connection = require('./connection');

const PRODUCTS = 'products';

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne({
      name,
      quantity,
    }));
};

const getProductByName = async (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name, }));
};

module.exports = {
  create,
  getProductByName,
};
