// Models faz a conexão com o banco de dados, sendo utilizado pelo services
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllTheProducts = async () => {
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
  const product = await db.collection('products').findOne({ name });
  return product;
};

const addProductToDB = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, ...product.ops[0] };
};

const updateOrCreateProduct = async (id, name, quantity) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  if (!product) return addProductToDB(name, quantity); // a questão não fala se não encontrar o produto, então...
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
  addProductToDB,
  getAllTheProducts,
  getProductById,
  findProductByName,
  updateOrCreateProduct,
  deleteUsingId,
};
