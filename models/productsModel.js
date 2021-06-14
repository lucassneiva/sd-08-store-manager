const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create({name, quantity}) {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: insertedId,
  };
}

async function getByName(name) {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  if(!product) return false;

  return product;
}

module.exports = {
  create,
  getByName,
};
