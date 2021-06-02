const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });

  return newProduct.ops[0];
};

const readAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const readById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;

  return product;
};

module.exports = {
  create,
  readAll,
  readById
};
