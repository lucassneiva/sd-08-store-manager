const { ObjectId } = require('bson');
const connect = require('./mongoConnection');

const collection = 'sales';

const addSale = async (itensSold) => {
  return connect().then((db) => db.collection(collection).insertOne({itensSold}))
    .then((result) => result.ops[0]);
};

const getSales = async () => {
  return connect().then((db) => db.collection(collection).find().toArray());
};

const getSalesById = async (id) => {
  return connect()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }));
};

const editSale = async (id, itensSold) => {
  return connect()
    .then((db) => db.collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold }}));
};

const deleteSale = async (id) => {
  return connect().then((db) => db.collection(collection)
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
  editSale,
  deleteSale
};