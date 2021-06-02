const { ObjectID } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'products';

const create = async (name, quantity) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .insertOne({ name, quantity });
  });
  return product;
};

const read = async () => {
  const products = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .find().toArray();
  });
  return products;
};

const readId = async (id) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .findOne(ObjectID(id));
  });
  // console.log(product);
  return product;
};

module.exports = {
  read,
  create,
  readId, 
};