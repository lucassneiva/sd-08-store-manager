const connection = require('./mongoConnection');
const { ObjectId, ObjectID } = require('mongodb');

const getAll = async () => connection()
  .then(db => db.collection('products').find().toArray())
  .then((products) => ({ products }));

const add = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({name, quantity}))
  .then((result) => ({ _id: result.insertedId, name, quantity}));

const getByName = async (name) => {

  const productName = await connection()  
    .then(db => db.collection('products').findOne({name}));

  !productName && null;

  return productName;
};
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productId = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectID(id)}));

  !productId && null;

  return productId;
};

const update = async ( id, name, quantity ) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then(
      (db) =>	db
        .collection('products')
        .updateOne({_id: ObjectId(id) }, { $set: { name, quantity }
        })
        .then((result) => ({ _id: result.insertedId, name, quantity }))
    );

  !product && null;

  return product;
};

module.exports = {
  getAll,
  add,
  getByName,
  getById,
  update,
};
