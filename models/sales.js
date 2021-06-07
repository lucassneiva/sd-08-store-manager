const connection = require('./connection');

const getDbCollection = async (db) => {
  return connection()
    .then((db) => db.collection('sales'));
};

const addSales = async (itensSold) => {
  return getDbCollection()
    .then((collection) => collection.insertOne({ itensSold }));
};

module.exports = {
  addSales,
};
