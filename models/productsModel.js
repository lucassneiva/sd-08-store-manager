const connection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const { insertedID } = await productsCollection
    .insertOne({ name: name, quantity: quantity });
  return {
    _id: insertedID,
    name,
    quantity
  };
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