const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getDbCollection = async (db) => {
  return connection()
    .then((db) => db.collection('sales'));
};

const addSales = async (itensSold) => {
  return getDbCollection()
    .then((collection) => collection.insertOne({ itensSold }));
};

const getSales = async () => {
  return getDbCollection()
    .then((collection) => collection.find().toArray());
};
const getSaleById = async (id) => {
  return getDbCollection()
    .then((collection) => collection.findOne(ObjectId(id)));
};

const updateSale = async (_id, itensSold) => {
  return getDbCollection()
    .then((collection) => collection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { itensSold } }
    ));
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
};
