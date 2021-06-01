const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products);

  return allProducts;
};

const create = async (name, quantity) => {
  await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }))
    .then(result => {
      return ({
        _id: result.insertedId,
        name,
        quantity,
      });
    });
};

const findByName = async (name) => {
  const getName = await connection()
    .then((db) => db.collection('products')
      .findOne({ name: name }));

  return getName;
};

const findById = async (id) => {
  const getId = await connection()
    .then((db) => db.collection('products')
      .findOne(ObjectId(id)));

  return getId;
};

module.exports = {
  create,
  findByName,
  findById,
  getAll,
};
