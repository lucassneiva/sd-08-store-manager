const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const addSales = async (sales) =>
  connection().then(async (db) => {
    const { insertedId } = await db
      .collection('sales')
      .insertOne({ itensSold: sales });
    return { _id: insertedId , itensSold: sales};
  });

module.exports = {
  getAllSales,
  addSales
};