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

const updateProduct = async (id, name, quantity) =>
  connection().then( async (db) => {
    const productUpdated = await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }});
    return { _id: id, name, quantity };
  });

const excludeProduct = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  
  return connection().then((db) => {
    return db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  excludeProduct
};
