const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insert = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (nameNewProduct) =>
  await connection()
    .then((db) => db.collection('products').findOne({ name: nameNewProduct }))
    .then(response => response)
    .catch(err => console.log(err));

const findById = async (id) =>
  await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then(response => response)
    .catch(err => console.log(err));

const getProducts = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find().toArray();
  } catch (error) {
    return null;
  }
};

module.exports = {
  getProducts,
  insert,
  findByName,
  findById,
};
