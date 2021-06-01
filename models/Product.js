const connection = require('./connection');
const { ObjectId } = require('mongodb');

const saveMe = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const create = saveMe(async (product) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne(product);
  return { _id: insertedId, ...product };
});

const getById = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const result = await db.collection('products').findOne(ObjectId(id));
  return result;
});

const getByName = saveMe(async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
});

const getAll = saveMe(async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
});

module.exports = {
  create,
  getById,
  getByName,
  getAll
};
