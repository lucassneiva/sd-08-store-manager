const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const { insertedId } = await productsCollection
    .insertOne({ name: name, quantity: quantity });
  return {
    _id: insertedId,
    name,
    quantity
  };
};

const findByName = async (name) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection.findOne({ name: name });
  return result;
};

const findProducts = async () => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const products = await productsCollection.find().toArray();
  console.log('findProducts - Model', products);
  return products;
};

const findById = async (id) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const product = await productsCollection.findOne(new ObjectId(id));
  return product;
};

const updateProduct = async (id, product) => {
  const { name, quantity } = product;
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const result = await productsCollection
    .updateOne({ _id: ObjectId(id) }, { $set: {
      name: name,
      quantity: quantity
    } });

  const updatedProduct = {
    _id: id,
    ...product,
  };
  return updatedProduct;
};

const deleteProduct = async(id) => {
  const productsCollection = await connection()
    .then(db => db.collection('products'));

  const productToDelete = await productsCollection.findOne(new ObjectId(id));
  await productsCollection.deleteOne({ _id: ObjectId(id) });
  return productToDelete;
};

module.exports = {
  create,
  findByName,
  findProducts,
  findById,
  updateProduct,
  deleteProduct,
};