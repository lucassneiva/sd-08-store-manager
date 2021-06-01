
const connection = require('../data/connection');

async function createProduct(name, quantity){
  const checkProduct = await connection()
    .then((db) => db.collection('products').findOne({name: name}));
  if (checkProduct) return null;
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

module.exports = {
  createProduct, getAll
};
