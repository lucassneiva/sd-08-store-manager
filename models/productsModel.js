const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({
    name,
    quantity
  });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

const updateOne = async (dataForUpdate) => {
  const db = await connection();
  const result = await db.collection('products').updateOne(dataForUpdate);
};

//getById('60c4f6f6ecc0b62dd790c178').then(console.log);
// getAll().then(console.log);
// create('café', 10).then(console.log);

module.exports = {
  create,
  getAll,
  getByName,
  getById,
};