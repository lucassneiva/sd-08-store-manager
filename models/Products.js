const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async ({name, quantity}) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne( {name, quantity} ));
  return { _id: insertedId, name, quantity };
};

const findByName = async ({name}) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  if (!product) return null;
  return product;
};

const findAll = async ()=>{
  const product = await connection()
    .then((db) => db.collection('products').find().toArray());
  if (!product) return null;
  return product;
};

const findById=async(id)=>{
  if(!ObjectId.isValid(id)) return null;
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if(!product) return null;
  return product;
};

module.exports = {
  createProduct,
  findByName,
  findAll,
  findById
};