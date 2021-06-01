const mongodb = require('mongodb');
const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: product.insertedId, name, quantity };
};

const nameExists = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  if (product) return true;
};

module.exports = { 
  addProduct,
  nameExists,
};