const Connection = require('./connection');
const { ObjectId } = require('mongodb');

const QDD = 422;

const getAll = async () => {
  const db = await Connection();
  return await db.collection('products').find({}).toArray();
};

const add = async (produto) => {
  const db = await Connection();
  const result = await db.collection('products').insertOne(produto);
  return result.ops[0];
};

const getByName = async (name) => {
  const db = await Connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getById = async (ids) => {
  try {
    const db = await Connection();
    const result = await db.collection('products').findOne({_id: ObjectId(ids) });
    return result;
  } catch (err) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
};
