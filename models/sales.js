const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = (sales) => {
  return connection()
    .then((db) => db.collection('sales').insert(sales))
    .then((result) => result.ops[0]);
};

const getSales = () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const findSale = (id) => {
  return connection().then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

module.exports = {
  createSale,
  getSales,
  findSale,
};
