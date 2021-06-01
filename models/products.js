const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  const { insertedID: _id } = await productsCollection
    .insertOne({ name, quantity });
  
  return {
    _id,
    name,
    quantity
  };
};


const read = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  return productsCollection.find();
};

module.exports = {
  create,
  read,
};