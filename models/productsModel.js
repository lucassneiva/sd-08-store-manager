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

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find().toArray();
  } catch (error) {
    return null;
  }
};

const updateByID = async (id, body) =>
  await connection()
    .then((db) => db.collection('products')
      .updateOne(
        new ObjectId(id),
        { $set: { name: body.name, quantity: body.quantity } }))
    .then(response => response)
    .catch(err => console.log(err));

module.exports = {
  getAll,
  insert,
  findByName,
  findById,
  updateByID
};
