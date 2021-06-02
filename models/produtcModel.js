const mongoConnection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const ZERO = 0;

const findByName = async (productName) => {
  const productData = await mongoConnection()
    .then((db) => db.collection('products').findOne({ name: productName }))
    .catch((err) => {
      console.error(err);
    });
  
  if (productData) return true;

  return false;
};

const findById = async (id) => {
  try {
    const productsCollection = await mongoConnection()
      .then((db) => db.collection('products'));

    if (!ObjectId.isValid(id)) return null;

    const product = await productsCollection.findOne(ObjectId(id));
    
    return product;
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  const productsCollection = await mongoConnection()
    .then((db) => db.collection('products'));

  const products = await productsCollection
    .find()
    .toArray();
  
  if (products.length === ZERO) return {};

  return { products: products.map(({ _id, ...productData }) => ({
    _id: _id,
    ...productData,
  }))};
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const update = async (id, newProduct) => {
  try {
    const productsCollection = await mongoConnection()
      .then((db) => db.collection('products'));
    
    if (!ObjectId.isValid(id)) return null;

    await productsCollection.updateOne({ _id: ObjectId(id) }, { $set: newProduct });
        
    return {
      _id: id,
      ...newProduct,
    };
  } catch (error) {
    return null;
  }
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  update,
};
