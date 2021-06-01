const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const productById = await db.collection('products').findOne(ObjectId(id));
  return productById;
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const updateById = await db.collection('products')
    .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity }});
  const updatedProduct = await db.collection('products').findOne(ObjectId(id));
  return updatedProduct;
};

const deleteById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const productById = await db.collection('products').findOne(ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id)});
  return productById;
};

module.exports = { 
  addProduct,
  nameExists,
  getAll,
  getById,
  updateById,
  deleteById
};