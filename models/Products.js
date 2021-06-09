const connection = require('./connection');

const create = async (product) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne(product));

  return { _id: insertedId, ...product };
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

module.exports = {
  create,
  findByName
};
