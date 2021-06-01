const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const { insertedId } = await productsCollection
    .insertOne({ name: name, quantity: quantity });
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const findByName = async (name) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection.findOne({ name: name });
  return result;
};

const findProducts = async () => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const products = await productsCollection.find().toArray();
  console.log('findProducts - Model', products);
  return products;
};

const findById = async (id) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const product = await productsCollection.findOne(new ObjectId(id));
  console.log('productByid', product);
  return product;
};

module.exports = {
  create,
  findByName,
  findProducts,
  findById
};