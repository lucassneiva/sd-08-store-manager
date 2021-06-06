const connection = require('./connection');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray());
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if(!productName) return null;

  return productName;
};

module.exports = {
  getAll,
  create,
  findByName,
};