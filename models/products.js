const conn = require('./connections');

const addProduct = async (name, quantity) => {
  const db = await conn();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

module.exports = { addProduct };
