
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

// 3 - Crie um endpoint para atualizar um produto
const updateProduct = async (body, params) => {
  const db = await connection();
  await db.collection('products').updateOne({_id: ObjectId(params.id)}, {
    $set: {
      name: body.name,
      quantity: body.quantity
    }
  });
  const isFound = await db.collection('products').findOne({ 'name': body['name']});
  return isFound;
};

// 2 - Crie um endpoint para listar os produtos
const getProduct = async (idParam) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(idParam));
  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};


module.exports = {
  existProduct,
  addProduct,
  updateProduct,
  getProduct,
  getAllProducts
};
