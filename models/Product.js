const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray())
    .then((products) => ({ products }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productID = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productID) return null;

  return productID;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const update = async ( id, name, quantity ) => {
  if (!ObjectId.isValid(id)) return null;

  const updateProduct = await connection()
    .then((db) =>	db.collection('products').updateOne({
      _id: ObjectId(id) }, { $set: { name, quantity }
    })
      .then((result) => ({ _id: result.insertedId, name, quantity }))
    );

  if (!updateProduct) return null;

  return updateProduct;
};

const exclude = async (id) => {
  return await connection().then(db => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
};

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if(!productName) return null;

  return productName;
};

/*
Referência:
https://github.com/cleytonoliveira/store-manager/blob/main/models/ProductsModel.js
*/
const subtractQuantity = async (id, quantity) => await connection()
  .then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: - quantity } }
    ));

const sumQuantity = async (id, quantity) => await connection()
  .then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: quantity } },
    ));
// ********************************************************************************

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
  findByName,
  subtractQuantity,
  sumQuantity,
};