const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  const dB = await connection();
  const result = await dB.collection('products').find().toArray();
  return result;
};

const addNewProduct = async ({name, quantity}) => {
  const dB = await connection();
  const result = await dB.collection('products').insertOne({name, quantity});
  return {_id: result.insertedId, name, quantity};
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};



module.exports = {
  getAllProducts,
  addNewProduct,
  getById
};
