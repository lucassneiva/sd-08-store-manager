const connection = require('./conn');
const { ObjectId } = require('mongodb');

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productId = await db.collection('products').findOne(ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id)});
  if(productId) productId;
};

const update = async ( id, name, quantity ) => {
  const db = await connection();
  await  db.collection('products')
    .updateOne({ _id: id}, { $set: { name, quantity } });
  return { _id: id, name, quantity};
};

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
  exclude,
  update,
  getById,
  getAll, 
  createProduct, 
  findProducts
};
