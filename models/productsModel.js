const connection = require('./connection');
collectionName = 'products';

const getNewInsertedProduct = (id, name, quantity) => ({_id: id, name, quantity});

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .then((products) => products);
};

const insertAProduct = async (name, quantity) =>
  connection()
    .then((db) => db.collection(collectionName).insertOne({ name, quantity }))
    .then((result) => getNewInsertedProduct(result.insertedId, name, quantity));

module.exports = {
  getAllProducts,
  insertAProduct,
};
