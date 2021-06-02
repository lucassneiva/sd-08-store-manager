const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const addProduct = async (name, quantity) =>
  connection().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

module.exports = {
  getAllProducts,
  addProduct,
  getProductById
};
