const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) =>
  connection().then((db) => db.collection('sales').insertOne({ itensSold }));

const getAll = async () => 
  connection().then((db) => db.collection('sales').find().toArray());

const getSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const update = async (id, arr) =>
  connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arr }})
  );

const findSold = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sale').findOne(new ObjectId(id)));
};

const del = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales') .deleteOne({ _id: ObjectId(id) }));
};

module.exports = { create, getAll, getSale, update, findSold, del };
