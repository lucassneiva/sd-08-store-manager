const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray())
    .then((products) => ({ products }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productID = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productID) return null;

  return productID;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if(!productName) return null;

  return productName;
};

module.exports = {
  getAll,
  findById,
  create,
  findByName,
};