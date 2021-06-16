const connection = require('./connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({
      _id,
      name,
      quantity,
    })));
};

const newProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((item) => ({ '_id': item.insertedId, name, quantity }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then((item) => ({ _id: item.id, name: item.name, quantity: item.quantity }));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products')
      .updateOne({ id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }))
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  newProduct,
  findById,
  updateProduct,
  deleteProduct,
};
