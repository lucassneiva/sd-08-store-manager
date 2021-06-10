const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const { ops: [product] } = await productsCollection
    .insertOne({ name, quantity });
  return product;
};

const findByName = async (name) => {
  const query = { name };
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const product = await productsCollection.findOne(query);
  if (!product) return null;
  return product;
};

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const products = await productsCollection.find().toArray();
  return products;
};

const findById = async (id) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  // console.log('model',  id, ObjectId(id));
  const product = await productsCollection.findOne({ _id: ObjectId(id) });
  // console.log('model',  product);
  if (!product) return null;
  return product;
};

module.exports = {
  create, findByName, getAll, findById
};