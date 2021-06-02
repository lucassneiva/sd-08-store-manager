const { ObjectId } = require('bson');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const findProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  if (product) return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const productsList = await db.collection('products').find().toArray();
  if (productsList) return productsList;
};

const findById = async (id) => {
  // if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne(new ObjectId(id));
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: id}, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  const db = await connection();
  const beforeProduct = await db.collection('products').findOne(new ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return beforeProduct;
};

module.exports = {
  createProduct,
  findProduct,
  getAllProducts,
  findById,
  updateProduct,
  deleteProduct,
};
