const connection = require('./connect');
// const { ObjectId } = require('mongodb');

const add = async (soldItems) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: soldItems }))
    .then((result) => result.ops[0]);
};

module.exports = { add };
