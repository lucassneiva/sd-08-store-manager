const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collectionName = 'sales';

const insertSale = async (salesArray) =>
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold: salesArray }))
    .then((result) => ({ _id: result.insertedId, itensSold: salesArray }));

const getAllSales = async () =>
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .then((sales) => sales);

const getSaleById = async (id) => {
  return connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)))
    .then((sale) => sale);
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
};
