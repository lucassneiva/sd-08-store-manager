const { ObjectId } = require('mongodb');
const conn = require('./connections');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;


const addProductDB = async (name, quantity) => {
  const db = await conn();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const getByNameDB = async (name) => {
  const db = await conn();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAllProductsDB = async () => {
  const db = await conn();
  const productsList = await db.collection('products').find().toArray();
  return { products: productsList };
};

const getProductByIdDB = async (id) => {
  const db = await conn();

  if (!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',  
    },
  };

  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

module.exports = {
  addProductDB,
  getByNameDB,
  getAllProductsDB,
  getProductByIdDB,
};
