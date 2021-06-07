
const connection = require('./connection');
const { ObjectId } = require('mongodb');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH
} = require('../service/consts');

// 1 - Crie um endpoint para o cadastro de produtos

const existProduct = async ( name ) => {
  const db = await connection();
  const isFound = await db.collection('products').findOne({ 'name': name});
  if (isFound) {
    throw {
      status: UNPROCESSABE_ENTITY,
      code: 'invalid_data',
      message: 'Product already exists'
    };
  }
};

const addProduct = async(body) => {
  const db = await connection();
  await db.collection('products').insertOne(body);
  const isFound = await db.collection('products').findOne({ 'name': body['name']});
  return isFound;
};

module.exports = {
  existProduct,
  addProduct
};
