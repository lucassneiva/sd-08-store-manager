const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async ({ name, quantity }) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const findByName = async ({ name }) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  if (!product) return null;
  return product;
};

const findAll = async () => {
  const product = await connection()
    .then((db) => db.collection('products').find().toArray());
  if (!product) return null;
  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!product) return null;
  return product;
};

const updateItem = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;
  await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: id, name, quantity };
};

const deleteItem = async (id) => { 
  if (!ObjectId.isValid(id)) return null;
  const itemDelete = await findById(id);
  
  await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));

  return itemDelete;

};

module.exports = {
  createProduct,
  findByName,
  findAll,
  findById,
  updateItem,
  deleteItem

};