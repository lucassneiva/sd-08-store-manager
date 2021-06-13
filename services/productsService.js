const productsModel = require('../models/productsModel');
const { ObjectID, ObjectId } = require('mongodb');

const addProduct = async (data) => {
  const MIN_NAME_LENGTH = 5;
  const { name, quantity } = data;
  if(name.length < MIN_NAME_LENGTH) {
    return new Error('"name" length must be at least 5 characters long');
  }
  if(typeof quantity === 'string') {
    return new Error('"quantity" must be a number');
  }
  if(quantity < 1) {
    return new Error('"quantity" must be larger than or equal to 1');
  }
  const [product] = await productsModel.getProductByName(name);
  if(product) {
    return new Error('Product already exists');
  }
  return productsModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  const idError = new Error('Wrong id format');
  if(!ObjectID.isValid(id)) return idError;
  return productsModel.getProductById(ObjectId(id)).then((obj) => {
    if(!obj) return idError;
    return obj;
  });
};

module.exports = {
  addProduct,
  getProductById
};