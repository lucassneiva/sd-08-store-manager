const connection = require('./connection');

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

module.exports = {
  Add,
  getAll
};