const products = require('../model/productModel');

async function createProduct(name, quantity){
  const data = await products.createProduct(name, quantity);
  if (!data) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'}};
  return data;
}

module.exports = {
  createProduct
};
