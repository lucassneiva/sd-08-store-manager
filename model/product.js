const connection = require('./conn');
const { ObjectId } = require('mongodb');



const getAll = async () => {
  const db = await connection();
  const product = await db.collection('products').find().toArray();
  // console.log(product);
  if (product) return product;
};

const getById = async (id) => {
  const db = await connection();
  const productId = await db.collection('products').findOne(ObjectId(id));
  console.log(productId);
  return productId;
};

const createProduct = async (name, quantity) =>{
  const db = await connection();
  const newProduct = await db.collection('products')
    .insertOne({ name, quantity });
  // console.log(newProduct);
  return newProduct;
};

const findProducts= async (name, quantity) => {
  const db = await connection();
  const isFound = await db.collection('products').findOne({name});
  // console.log('aoba', isFound);
  return isFound;
};

module.exports = {
  getById,
  getAll, 
  createProduct, 
  findProducts
};
