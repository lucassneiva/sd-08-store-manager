const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => (db).collection('sales').find().toArray()); 

const getOne = async (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const create = async (array) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ 'itensSold' : array }));
  return { _id: sale.insertedId,  itensSold: array};
};

const updateOne = async (id, array) => connection()
  .then((db) => (db).collection('sales').updateOne({ _id: ObjectId(id) }, 
    { $set : { 'itensSold' : array }}));

const deleteOne = async (id) => connection().then( db => 
  db.collection('sales').deleteOne({ _id: ObjectId(id)}));

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
};