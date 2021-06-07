const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());
  
const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const getById = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!productData) return null;
  return productData;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const update = async (_id, name, quantity) => connection()
  .then((db) => 
    db.collection('products').updateOne({ _id }, { $set: { name, quantity }}));
  



module.exports = {
  getAll,
  getById,
  findByName,
  create,
  update,
};