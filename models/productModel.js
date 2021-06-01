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

module.exports = { createProduct, findProduct };
