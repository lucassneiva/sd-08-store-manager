const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

module.exports = {
  newProduct,
  findProductByName,
  getAllProducts,
  getProductById,
};