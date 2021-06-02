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

const getByName = async (name) => {
  try {
    const db = await Connection();
    const result = await db.collection('products').findOne({ name });
    
    return result;
  } catch (_error) {
    return 'nAchei';
  }
};

module.exports = {
  add,
  getAll,
  getByName,
};
