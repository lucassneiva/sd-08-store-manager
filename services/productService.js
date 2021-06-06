const { ObjectId } = require('mongodb');
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

async function updateProduct(id, name, quantity){
  const data = await products.updateProduct(id, name, quantity);
  if(!data){
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
  return data;
}

async function deleteProduct(id){
  const data = await products.deleteProduct(id);
  if(!data){
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
  return data;
}

async function refreshProductQuantity(content, mode){
  const zero = 0;
  if(content){
    const data = content.forEach(async ({quantity, productId}) => {
      const dataQty = await products.getById(ObjectId(productId));
      if(dataQty.quantity - quantity < zero && mode){
        return {
          err:{
            code: 'stock problem',
            message: 'Such amount is not permitted to sell'
          }
        };
      }
      if(dataQty){
        await products.refreshProductQuantity(dataQty._id, quantity, mode);
      }
    });
    return data;
  }
}
module.exports = {
  createProduct, getAll, getById, updateProduct, deleteProduct, refreshProductQuantity
};
