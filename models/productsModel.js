const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  try {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    const result = { products: [...products] };
    return result;
  } catch (err) {
    return err;
  }
};

const findProduct = async (productId) => {
  try {
    const db = await connection();
    const result = await db.collection('products').findOne({ _id: ObjectId(productId) });
    return result;
  } catch (err) {
    return null;
  }
};

const createProduct = async ({ name, quantity }) => {
  try {
    const db = await connection();
    const products = await db.collection('products').findOne({ name: name });
    if (products) {
      return false;
    }
    const { ops } = await db.collection('products').insertOne({ name, quantity });
    const obj = {
      _id: ops[0]._id,
      name: ops[0].name,
      quantity: ops[0].quantity,
    };
    return obj;
  } catch (err) {
    return err;
  }
};

const zero = 0;
const updateProduct = async (
  productId, { name, quantity }, operation = null, quant = zero) => {
  try {
    const db = await connection();
    if (operation === 'inc') {
      await db.collection('products')
        .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quant } });
      return true;
    }
    await db.collection('products').updateOne(
      { _id: ObjectId(productId) }, { $set: { name, quantity } });
    return true;
  } catch (err) {
    return err;
  }
};

const deleteProduct = async (productId) => {
  try {
    const db = await connection();
    const result = await db.collection('products').findOne({ _id: ObjectId(productId) });
    await db.collection('products').deleteOne({ _id: ObjectId(productId) });
    return result;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
