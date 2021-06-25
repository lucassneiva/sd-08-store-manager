const connection = require('./connection');
const { ObjectId } = require('mongodb');

const Add = async(name, quantity) => {
  const product =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return product;
};

const getAll = async() => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());
  return allProducts;
    
};

const getAllById = async(id) => {
  const productsId =  await connection();
  if (!ObjectId.isValid(id)) return null;
  return productsId.collection('products').findOne(ObjectId(id));
};

// getAll().then((res) => console.log(res));

module.exports = {
  Add,
  getAll,
  getAllById
};