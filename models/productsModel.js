const connection = require('./connection');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const productInserted = await productsCollection
    .insertOne({ name, quantity });

  return productInserted;
};

module.exports = {
  create,
};
