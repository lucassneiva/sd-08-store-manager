// const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (products) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({itensSold: products})
      .then(result => result.ops[0]));
};

module.exports = {
  create,
};
