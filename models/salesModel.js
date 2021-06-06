const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (salesMade) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId } = await salesCollection
    .insertOne({itensSold: [...salesMade]});

  return {
    insertedId,
    itensSold: [...salesMade]
  };
};

module.exports = {
  create,
};