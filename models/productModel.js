const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProductModel = async (name, quantity) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });
    if (product) return 'not unique';
    const { ops } = await db.collection('products').insertOne({ name, quantity });
    const [result] = ops.map(({ _id, name, quantity }) => ({
      _id,
      name,
      quantity,
    }));
    return result;
  } catch (error) {
    return error;
  }
};

const getAllProductsModel = async () => {
  try {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    const result = { products: [...products] };
    return result;
  } catch (error) {
    return error;
  }
};

const getByIdProductsModel = async (id) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne(ObjectId(id));
    return product;
  } catch (error) {
    return null;
  }
};

const updateProductModel = async (id, name, quantity) => {
  try {
    const db = await connection();
    await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return 'updated';
  } catch (error) {
    return error;
  }
};

const deleteProductModel = async (id) => {
  try {
    const db = await connection();
    const product = db.collection('products').findOne({ _id: ObjectId(id) });
    await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return product;
  } catch (error) {
    return 'not deleted';
  }
};

module.exports = {
  createProductModel,
  getAllProductsModel,
  getByIdProductsModel,
  updateProductModel,
  deleteProductModel,
};
