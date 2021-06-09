const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const { ops: [product] } = await productsCollection
    .insertOne({ name, quantity });
  return product;
};

const findByName = async (name) => {
  const query = { name };
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  const product = await productsCollection.findOne(query);
  if (!product) return null;
  return product;
};

module.exports = {
  create, findByName
};