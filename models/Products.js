const connection = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (product) => {
  return connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => result.ops[0]);
};

const findProduct = async ({ name }) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
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

const updateById = async (id, updatedProduct) => {
  try {
    return connection().then((db) =>
      db.collection('products')
        .updateOne({ _id: ObjectId(id) }, { $set: updatedProduct }),
    );

  } catch (err) {
    return null;
  }
};

const deleteById = async (id) => {
  const deleteResult = await connection().then((db) =>
    db.collection('products').deleteOne(new ObjectId(id)),
  );
};

module.exports = {
  add,
  findProduct,
  getAll,
  getById,
  updateById,
};
