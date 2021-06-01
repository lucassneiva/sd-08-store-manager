const Connection = require('./connection');

const getAll = async () => {
  try {
    const db = await Connection();
    return await db.collection('products').find({}).toArray();
  } catch (_error) {
    return null;
  }
};

const add = async (produto) => {
  try {
    const db = await Connection();
    const result = await db.collection('products').insertOne(produto);
    return result.ops[0];
  } catch (_error) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
};
