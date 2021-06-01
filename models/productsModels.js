const connection = require('./connection');
const { ObjectId } = require('mongodb');

const PRODUCTS = 'products';

const create = async ({ name, quantity }) => {
  try {
    const db = await connection();
    const products = await db.collection(PRODUCTS).findOne( { name: name });
    if (products) return 'found';
    const { ops } = await db.collection(PRODUCTS).insertOne({ name, quantity });
    const [result] = ops.map(({ _id, name, quantity }) => ({
      _id,
      name,
      quantity,
    }));
    return result;
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    const products = await db.collection(PRODUCTS).find().toArray();
    const result = { products: [...products] };
    return result;
  } catch (err) {
    return err;
  }
};

const findById = async (productId) => {
  try {
    const db = await connection();
    const result = await db.collection(PRODUCTS).findOne({ _id: ObjectId(productId) });
    return result;
  } catch (err) {
    return null;
  }
};

module.exports = {
  create,
  getAll,
  findById,
};
