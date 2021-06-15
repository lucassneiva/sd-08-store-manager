const connection = require('./connection');

const { ObjectId } = require('mongodb');
const { name } = require('faker');

const getNewProduct = (productData) => {
  const { id, name, quantity } = productData;

  return {
    '_id': id,
    name,
    quantity,
  };
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => getNewProduct({
      id: _id,
      name,
      quantity,
    })));
};

const newProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then((result) => getNewProduct({
      id,
      name: result.name,
      quantity: result.quantity
    }));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products')
      .updateOne({ id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }))
    .then(() => getNewProduct({
      id,
      name,
      quantity,
    }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  console.log(ObjectId(id));

  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then((product) => getNewProduct({
      id,
      name: product.name,
      quantity: product.quantity,
    }));
};

module.exports = {
  getAll,
  newProduct,
  findById,
  updateProduct,
  deleteProduct,
};
