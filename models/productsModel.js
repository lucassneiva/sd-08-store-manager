// Models faz a conexão com o banco de dados, sendo utilizado pelo services
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null; // ObjectId.isValid, uma mão na roda, fonte: https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
  return db.collection('products').findOne(ObjectId(id));
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ 'name': name });
  return product;
};

const addProduct = async (name, quantity = 1) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product;
};

const updateOrCreateProduct = async (id, name, quantity = 1) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!product) return addProduct(name, quantity);
  return { id, name, quantity };
};

const deleteUsingId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await getProductById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  addProduct,
  getAll,
  getProductById,
  findProductByName,
  updateOrCreateProduct,
  deleteUsingId,
};
