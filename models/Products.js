const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (product) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne(product));

  return { _id: insertedId, ...product };
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const findAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());

  if (!products) return null;

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

const update = async (updatedProduct) => {
  const { id, product } = updatedProduct;

  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: product }));

  return { _id: id, ...product };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  findByName,
  findAll,
  findById,
  update,
  remove
};
