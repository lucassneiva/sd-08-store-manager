const connection = require('../models/connections');

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

module.exports = { createProduct, findProduct };
