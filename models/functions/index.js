const { ObjectId } = require('mongodb');
const connect = require('../connection');

const addNew = async(values, collectionName) =>  {
  const db = await connect();
  const addedDocument = await db.collection(collectionName).insertOne({...values});
  return addedDocument;
};

const getById = async(id, collectionName) => {
  const db = await connect();
  if (!ObjectId.isValid(id)) return null;
  
  const foundById = await db.collection(collectionName).findOne({'_id': ObjectId(id)});
  return foundById;
};

const getAll = async(collectionName) => {
  const db = await connect();
  const allProducts = await db.collection(collectionName).find().toArray();
  return allProducts;
};

const deleteById = async(id, collectionName) => {
  
  if (!ObjectId.isValid(id)) return null;
  
  const db = await connect();
  const deletedProduct = await db.collection(collectionName)
    .deleteOne({'_id': ObjectId(id)});
  return deletedProduct;
};

const getByKeysValues = async(keysValues, collectionName) => {
  const db = await connect();
  const product = await db.collection(collectionName).findOne({...keysValues});
  return product;
};

const update = async(id, keysValues, collectionName) => {
  const db = await connect();
  await db.collection(collectionName).updateOne(
    {'_id': ObjectId(id)},
    {$set: {
      ...keysValues
    }}
  );
};

module.exports = {
  getById,
  addNew,
  getAll,
  deleteById,
  getByKeysValues,
  update,
};
