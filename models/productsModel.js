const connection = require('./connection');
const { ObjectId } = require('mongodb');

const ZERO = 0;

const findProductByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const getAllProducts = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getProductById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne({_id: new ObjectId(id)});
  return result;
};

const updateProductById = async (id, newProductInfo) => {
  const db = await connection();
  const result = await db.collection('products')
    .updateOne({ _id: new ObjectId(id) }, { $set: newProductInfo });
  if (!result.matchedCount) return null;
  return {
    _id: id,
    ...newProductInfo,
  };
};

const deleteProductById = async (id) => {
  const db = await connection();
  const result = await db.collection('products')
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  newProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};