const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'sales';

const create = async (sale) => {
  const insertedSale = await connection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne(sale));
  
  return insertedSale;
};

module.exports = {
  create,
};