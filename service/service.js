const products = require('../model/product');
const { ObjectId } = require('mongodb');

const isValidProduct = async (name, quantity, products) => {
  const length = 5;
  const quant = 0;
  if(name.length <= length) {
    return  '"name" length must be at least 5 characters long';
  };

  if(products){
    return  'Product already exists';
  };
  
  if(quantity <= quant) {
    return  '"quantity" must be larger than or equal to 1';
  }

  if(typeof quantity !== 'number') {
    return '"quantity" must be a number';
 
  }
  return undefined;
};

const isUpdateValid = async (name, quantity) => {
  const length = 5;
  const quant = 0;
  if(name.length <= length) {
    return  '"name" length must be at least 5 characters long';
  };
 
  if(quantity <= quant) {
    return  '"quantity" must be larger than or equal to 1';
  }

  if(typeof quantity !== 'number') {
    return '"quantity" must be a number';
 
  }
  return undefined;
};

const create = async (name, quantity) => {
  const existingProduct = await products.findProducts(name);
  const notValid = await isValidProduct(name, quantity, existingProduct);
  if(notValid) {
    throw new Error(notValid);
  }
  const newProduct = await products.createProduct(name, quantity);
  return { _id: newProduct.insertedId, name, quantity };
  ;
};

const getAll = async () => { 
  const existingProduct = await products.getAll();
  return existingProduct;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const productId = await products.getById(id);
  // console.log(productId);
  return productId;
};

const update = async (id, name, quantity) => {
  const notValid = await isUpdateValid(name, quantity);
  if(notValid) {
    throw new Error(notValid);
  }
  const productUpdate = await products.update(id, name, quantity);
  return productUpdate;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const excludeProduct = await products.exclude(id);
  return excludeProduct;
};



module.exports = {
  exclude,
  update,
  create,
  getAll,
  getById
};
