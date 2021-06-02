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
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

const update = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!product) return addProduct(name, quantity);
  return { id, name, quantity };
};

module.exports = {
  addProduct,
  getAll,
  getProductById,
  update,
  excludeProduct,
};
