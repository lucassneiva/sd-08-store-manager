const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'products';

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne({ name, quantity });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findAllProducts = async () => {
  try {
    const db = await connection();
    return await db.collection(NAME_COLLECTION).find().toArray();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findProduct = async ({ name }) => {
  try {
    const product = await connection()
      .then((db) => db.collection(NAME_COLLECTION).findOne({ name }));
    if (!product) return null;
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findProductById = async (id) => {
  try {
    const product = await connection().then((db) => {
      return db
        .collection(NAME_COLLECTION)
        .findOne(new ObjectId(id));
    });
    if (!product) return null;
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getProductToUpdate = async (id, name, quantity) => {
  try {
    const product = await connection().then((db) => {
      return db
        .collection(NAME_COLLECTION)
        .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    });
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addProduct,
  findAllProducts,
  findProduct,
  findProductById,
  getProductToUpdate,
};