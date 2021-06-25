const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const otherProduct = await db.collection('products').insertOne({ name, quantity });

  return otherProduct.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  try {
    const product = await connection().then((db) =>
      db.collection('products').findOne(new ObjectId(id)),
    );

    if (!product) return null;

    return product;
  } catch (err) {
    return null;
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
