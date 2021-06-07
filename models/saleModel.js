const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne(sale);
  return { _id: result.insertedId, ...sale };
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const update = async (id, newData) => {
  const db = await connection();
  const instructions = { $set: newData };
  const result = await db
    .collection('sales')
    .findOneAndUpdate({ _id: new ObjectId(id) }, instructions);
  return { ...result.value, ...newData };
};

const remove = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
};

module.exports = { create, getAll, getById, update, remove };
