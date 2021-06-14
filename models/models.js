const connection = require('../models/connections');
const { ObjectId } = require('mongodb');

function createProduct(product) {
  const { name, quantity} = product;
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));
}

async function findProduct(product) {
  const { name } = product;
  const productFindedPromise = connection()
    .then((db) => db.collection('products')
      .findOne({ name }));
  const productFinded = await productFindedPromise;
  return productFinded;
  // console.log(productFinded);
}

async function getAllProducts() {
  const allProductsPromise = connection()
    .then((db) => db.collection('products')
      .find({}).toArray( ) );
  const allProducts = await allProductsPromise;
  return allProducts;
}

async function getByID(id) {
  const productByIdPromisse = connection()
    .then((db) => db.collection('products')
      .findOne(  ObjectId(id)));
  const product = await productByIdPromisse;
  return product;
};

module.exports = { createProduct, findProduct, getAllProducts, getByID };
