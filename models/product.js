const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const otherProduct = await db.collection('products').insertOne({ name, quantity });

  return otherProduct.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

module.exports = {
  create,
  getAll  
};
