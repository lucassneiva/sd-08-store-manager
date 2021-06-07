const connection = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (product) => {
  return connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => result.ops[0]);
};

const findProduct = async (product) => {
  const { name } = product;
  const productFound = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return productFound;
};

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  return product;
};

const updateById = async (id, updatedProduct) => {
  return connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: updatedProduct }),
  );
};

const deleteById = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }),
  );
  return product;
};

module.exports = {
  add,
  findProduct,
  getAll,
  getById,
  updateById,
  deleteById,
};
