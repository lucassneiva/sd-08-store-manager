const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (product) => {
  const db = await connection();
  const result = await db.collection('products').insertOne(product);
  return { _id: result.insertedId, ...product };
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne(new ObjectId(id));
  return result;
};

const update = async (id, newData) => {
  const db = await connection();
  const instructions = { $set: newData };
  const result = await db
    .collection('products')
    .findOneAndUpdate({ _id: new ObjectId(id) }, instructions);
  return { ...result.value, ...newData };
};

const remove = async (id) => {
  const db = await connection();
  const result = await db
    .collection('products')
    .findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
};

module.exports = { create, getAll, getById, update, remove };
