const { ObjectId } = require('mongodb');
const connection = require('../data/connection');

async function createProduct(name, quantity){
  const productCheck = await connection()
    .then((db) => db.collection('products').findOne({name: name}));
  if (productCheck) return null;
  const data = await connection().then((db) =>
    db.collection('products').insertOne({name, quantity}));
  return {
    _id: data.insertedId,
    name,
    quantity
  };
}

async function getAll(){
  const data = await connection()
    .then((db) => db.collection('products').find().toArray());
  return {
    products: data
  };
}

async function getById(id){
  if(!ObjectId.isValid(id)) return null;
  const data = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return !data ? null : data;
}

module.exports = {
  createProduct, getAll, getById
};