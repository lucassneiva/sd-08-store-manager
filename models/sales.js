const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = (sales) => {
  return connection()
    .then((db) =>
      db.collection('sales').insert(sales),
    )
    .then((result) => result.ops[0]);
};

const getSales = () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

module.exports = {
  createSale,
  getSales
};
