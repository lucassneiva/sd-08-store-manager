const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

const create = (name, quantity) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).insertOne({
      name,
      quantity,
    }));
};

const getAll = () => {
  return result = connection()
    .then((db) => db.collection(PRODUCTS).find().toArray());
};

const getProductByName = (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ name }));
};

const getProductById = (id) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).findOne({ _id: id }));
};

const updateProduct = (id, name, quantity) => {
  return connection()
    .then((db) => db.collection(PRODUCTS).updateOne(
      { _id: id },
      { $set: { name, quantity } },
    ))
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  await connection()
    .then((db) => db.collection(PRODUCTS).deleteOne({ _id: id }));

  return product;
};

module.exports = {
  create,
  deleteProduct,
  getAll,
  getProductByName,
  getProductById,
  updateProduct,
};
