const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const createProduct = async ({ name, quantity }) => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => ({ _id: result.insertedId, name, quantity }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getProducts = async () => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').find().toArray());

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getProductById = async (id) => {
  try {
    if (!ObjectID.isValid(id)) { return null; };

    const result = await connection()
      .then((db) => db.collection('products').findOne({ _id: new ObjectId(id) }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getProductByName = async (itemName) => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').findOne({ name: itemName }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    const verifyProduct = await getProductById(id);
    if (!verifyProduct) return null;

    await connection()
      .then((db) => db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        { $set: { name: name, quantity: quantity } }
      ));

    return ({ id, name, quantity });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const removeProduct = async (id) => {
  try {
    const product = await getProductById(id);
    if (!product) return null;

    await connection().then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));

    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductByName,
  updateProduct,
  removeProduct,
};
