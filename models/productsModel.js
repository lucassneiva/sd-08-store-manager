const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('products').findOne(ObjectId(id));
};

const addProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product;
};

const excludeProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await getBytId(id);
  await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return product;
};

const updateProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: name, quantity });
  if (!product) return add(name, quantity);
  return product;
};

module.exports = {
  addProduct,
  getAll,
  getProductById,
  updateProduct,
  excludeProduct,
};
