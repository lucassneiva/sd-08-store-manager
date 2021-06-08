const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getAll = async() =>  await connection()
  .then((db) => db.collection('products').find().toArray());

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if(!productName) return null;

  return productName;
};

const create = async ( name, quantity ) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAll,
  findByName,
  create,
};