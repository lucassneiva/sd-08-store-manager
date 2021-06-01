const connection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection.insertOne({ name: name, quantity: quantity });
  return result;
};

const findByName = async (name) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection.findOne({ name: name });
  return result;
};

module.exports = {
  create,
  findByName,
};