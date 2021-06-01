const products = require('../model/productModel');

async function createProduct(name, quantity){
  const data = await products.createProduct(name, quantity);
  if (!data) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'}};
  return data;
}

async function getAll(){
  const data = await products.getAll();
  return data;
}

async function getById(id){
  const data = await products.getById(id);
  if (!data) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'}
  };
  return data;
}

module.exports = {
  createProduct, getAll, getById
};
