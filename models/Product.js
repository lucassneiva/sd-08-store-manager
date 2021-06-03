const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (newProduct) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('products').insertOne(newProduct);
  return {
    _id: insertedId,
    ...newProduct,
  };
};

const findByName = async (name) => {
  const conn = await connection();
  const result = await conn.collection('products').findOne({ name });
  return result;
};

const getAll = async () => {
  const conn = await connection();
  return conn.collection('products').find().toArray();
};

const findyById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connection();
  return conn.collection('products').findOne(ObjectId(id));
};

module.exports = {
  create,
  findByName,
  getAll,
  findyById,
};
