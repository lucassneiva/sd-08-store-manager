// const { ObjectId } = require('mongodb');
const connection = require('./connection');
collectionName = 'sales';

const insertSale = async (salesArray) =>
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold: salesArray }))
    .then((result) => ({ _id: result.insertedId, itensSold: salesArray }));

module.exports = {
  insertSale,
};
