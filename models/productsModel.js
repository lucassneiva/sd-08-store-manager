const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => (db).collection('products').find().toArray());

const create = async ({name, quantity}) => {
  const products = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return { _id: products.insertedId, name, quantity};
};

const getOne = async (id) => connection()
  .then((db) => (db).collection('products').findOne({ _id: ObjectId(id) }));
;

const updateOne = async (id, name, quantity) => connection()
  .then((db) => (db).collection('products').updateOne({ _id: ObjectId(id) }, 
    { $set : { 'name' : name , 'quantity': quantity}}));

const deleteOne = async (id) => connection().then( db => 
  db.collection('products').deleteOne({ _id: ObjectId(id)}));

module.exports = {
  getAll,
  create,
  getOne,
  updateOne,
  deleteOne,
};