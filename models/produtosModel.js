const Connection = require('./connection');
const { ObjectId } = require('mongodb');

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
    return null;
  }
};

const getById = async (ids) => {
  // try {
  const db = await Connection();
  const result = await db.collection('products').findOne({_id: ObjectId(ids) });
  console.log('linha 38', result);
  return result;
  // } catch (error) {
  //   console.log('entrei aqui');
  //   return null;
  // }
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
};
