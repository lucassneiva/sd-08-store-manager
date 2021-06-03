const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async(name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}));
  const createProduct = { _id: insertedId, name, quantity };
  return createProduct;
};

const findByName = async (name) => {
  const productByName = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return productByName;
};

const findAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const findById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return productById;
};

module.exports = {
  findByName,
  create,
  findAll,
  findById,
};
