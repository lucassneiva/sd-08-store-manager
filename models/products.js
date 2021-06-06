const connection = require('./connection');
const { ObjectId } = require('mongodb');

const tryCatch =
  (callback) =>
    async (...args) => {
      try {
        return callback(...args);
      } catch (error) {
        console.log(error.message);
        return process.exit(1);
      }
    };

const createOne = tryCatch(async (product) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne(product);

  return { _id: insertedId, ...product };
});

const getByName = tryCatch(async (product) => {
  const db = await connection();

  const { name } = product;

  const result = await db.collection('products').findOne({ name: name });

  return result;
});

const getAllProducts = tryCatch(async () => {
  const db = await connection();

  const result = await db.collection('products').find().toArray();

  return result;
});

const getById = tryCatch(async (id) => {
  const db = await connection();

  const result = await db.collection('products').findOne({ _id: ObjectId(id) });

  return result;
});

const updateById = tryCatch(async (id, data) => {
  const db = await connection();

  const updateProduct = await db
    .collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name: data.name, quantity: data.quantity } }
    );

  const result = await db.collection('products').findOne({ _id: ObjectId(id) });

  return result;
});

const deleteById = tryCatch(async (id) => {
  const db = await connection();

  const productToDelete = await db.collection('products').findOne({ _id: ObjectId(id) });

  const deleteProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return productToDelete;
});

module.exports = {
  createOne,
  getByName,
  getAllProducts,
  getById,
  updateById,
  deleteById,
};
