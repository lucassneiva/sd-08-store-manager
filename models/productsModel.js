const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId } = await productsCollection
    .insertOne({ name, quantity });
  
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const searchByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  return await productsCollection.findOne({name: name});
};

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const allProducts = await productsCollection
    .find({}).toArray();

  return allProducts;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const product = await productsCollection
    .findOne(new ObjectId(id));

  if (!product) return null;
    
  return product;
};

const updateById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const newId = new ObjectId(id);
  const newData = {name, quantity};

  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const update = await productsCollection
    .findOneAndUpdate({ _id: newId }, { $set: newData }, { returnOriginal: false });
    
  return update.value;
};

module.exports = {
  create,
  searchByName,
  getAll,
  getById,
  updateById,
};
