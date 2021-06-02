// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getByName = async(nameToFind) => {

  const db = await connect();
  const product = await db.collection('products').findOne({'name': nameToFind});
  return product;
};

const add = async(name, quantity) =>  {
  const db = await connect();
  const addedProduct = await db.collection('products').insertOne({name, quantity});
  console.log(addedProduct);
  return addedProduct;
};

module.exports = {
  getByName,
  add
};

