const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  const dB = await connection();
  const result = await dB.collection('products').find().toArray();
  return result;
};

const addNewProduct = async (name, quantity) => {
  const dB = await connection();
  const result = await dB.collection('products').insertOne({name, quantity});
  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('products').findOne({_id: ObjectId(id)});
};

const update = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!result) return addNewProduct(name, quantity);
  return { id, name, quantity };
};

const remove = async (id) => {
  const db = await connection();
  const result = await db
    .collection('products').deleteOne({_id: ObjectId(id)});
  return result;
};


module.exports = {
  getAllProducts,
  addNewProduct,
  getById,
  update,
  remove
};
