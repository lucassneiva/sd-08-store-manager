const connection = require('./connection');
const { ObjectId } = require('mongodb');

const tryCatch = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error.message);
    return process.exit(1);
  }
};

const createOne = tryCatch(async (product) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne(product);

  return { _id: insertedId, ...product };
});

const getByName = tryCatch(async (product) => {
  const db = await connection();

  const { name } = product;

  const result = await db.collection('products').findOne({ name: name });

  return result;
});

const getAllProducts = tryCatch(async () => {
  const db = await connection();

  const result = await db.collection('products').find().toArray();

  // console.log('models/products result', result);
  return result;
});

const getById = tryCatch(async (id) => {
  const db = await connection();

  // const { _id } = product;

  const result = await db.collection('products').findOne({ _id: ObjectId(id) });

  return result;
});

module.exports = {
  createOne,
  getByName,
  getAllProducts,
  getById
};
