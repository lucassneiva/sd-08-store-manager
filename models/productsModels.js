const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const productById = await db.collection('products').findOne(ObjectId(id));
  return productById;
};

const addProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const updatedProduct = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!updatedProduct) return addProduct(name, quantity);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const deletedProduct = await getProductById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return deletedProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
