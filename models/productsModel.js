const connection = require('./connection');
// const { ObjectId } = require('mongodb');

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

// getAll().then((data) => console.log(data));
// create('café', 10).then((data) => data.json()).then( r =>console.log(r));

module.exports = {
  create,
  getAll,
  getByName
};