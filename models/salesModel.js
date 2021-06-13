const connect = require('./mongoConnection');

const collection = 'sales';

const addSale = async (itensSold) => {
  return connect().then((db) => db.collection(collection).insertOne({itensSold}))
    .then((result) => result.ops[0]);
};

module.exports = {
  addSale,
};