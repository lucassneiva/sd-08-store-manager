const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0])
    .catch((err) => err);
};

const findProduct = async (id) => {
  return connection().then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) =>
      db.collection('products').updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: { name, quantity } },
      ),
    )
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id)}))
    .then((result) => result);
};

module.exports = {
  getProducts,
  createProduct,
  findProduct,
  updateProduct,
  deleteProduct
};
