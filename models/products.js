const conn = require('./connections');

const addProductDB = async (name, quantity) => {
  const db = await conn();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const getByNameDB = async (name) => {
  const db = await conn();
  const product = await db.collection('products').findOne({ name });
  return product;
};

module.exports = {
  addProductDB,
  getByNameDB,
};
