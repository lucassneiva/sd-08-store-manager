const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ name, quantity }) => {
  const db = await connection();
  const { ops: [product] } = await db.collection('products')
    .insertOne({ name, quantity });
  return product;
};

const findByName = async (name) => {
  const query = { name };
  const db = await connection();
  return await db.collection('products')
    .findOne(query);
};

const getAll = async () => {
  const db = await connection();
  return await db.collection('products')
    .find().toArray();
};

const findById = async (id) => {
  const db = await connection();
  return await db.collection('products')
    .findOne({ _id: ObjectId(id) });
};

const updateById = async (id, name, brand) => {
  const db = await connection();
  return await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, brand } });
};

module.exports = {
  create, findByName, getAll, findById, updateById,
};