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

module.exports = {
  create,
  searchByName,
  getAll,
  getById,
};
