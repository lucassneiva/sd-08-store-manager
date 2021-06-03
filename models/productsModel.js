const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const createProduct = async ({ name, quantity }) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

  return result;
};

const getProducts = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());

  return result;
};

const getProductById = async (id) => {
  if (!ObjectID.isValid(id)) { return null; };

  const result = await connection()
    .then((db) => db.collection('products').findOne({ _id: new ObjectId(id) }));

  return result;
};

const getProductByName = async (itemName) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name: itemName }));

  return result;
};

const updateProduct = async (id, name, quantity) => {
  const verifyProduct = await getProductById(id);
  if (!verifyProduct) return null;

  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: name, quantity: quantity } }
    ));

  return ({ id, name, quantity });
};

const removeProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) return null;

  await connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductByName,
  updateProduct,
  removeProduct,
};
