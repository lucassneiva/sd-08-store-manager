const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getByName = async(nameToFind) => {

  const db = await connect();
  const product = await db.collection('products').findOne({'name': nameToFind});
  return product;
};

const add = async(name, quantity) =>  {
  const db = await connect();
  const addedProduct = await db.collection('products').insertOne({name, quantity});
  return addedProduct;
};

const getAll = async() => {
  const db = await connect();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const getById = async(id) => {
  const db = await connect();
  if (!ObjectId.isValid(id)) return null;
  
  const productById = await db.collection('products').findOne({'_id': ObjectId(id)});
  return productById;
};

const update = async(id, name, quantity) => {
  const db = await connect();
  const updatedProduct = await db.collection('products').updateOne(
    {'_id': ObjectId(id)},
    {$set: {
      name,
      quantity
    }}
  );
};

module.exports = {
  getByName,
  add,
  getAll,
  getById,
  update,
};

