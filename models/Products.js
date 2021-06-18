const connection = require('./connection');

const createProduct = async ({name, quantity}) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne( {name, quantity} ));
  return { _id: insertedId, name, quantity };
};

const findByName = async ({name}) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  if (!product) return null;
  return product;
};

module.exports = {
  createProduct,
  findByName
};