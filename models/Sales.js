const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) =>
  connection()
    .then ((db) => db.collection('sales').insertOne ({itensSold}));

const getAll = async () => 
  connection() 
    .then ((db) => db.collection('sales').find().toArray());

const getSales = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then ((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const del = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

const updateSales = async (id, arr) =>
  connection()
    .then((db) => db.collection('sales')
      .updateOne({_id: ObjectId(id)}, {$set: { itensSold: arr }}));

module.exports  = {
  create,
  getAll,
  getSales,
  updateSales,
  del
};