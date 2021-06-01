const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) =>
  connection().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

module.exports = {
  getAllProducts,
  addProduct
};
