const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => ({ products }));
};

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!productName) return null;

  return productName;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!result) return null;

  return result;
};

const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const update = async (id, name, quantity)=>{
  if (!ObjectId.isValid(id)) return null;

  const result = await connection()
    .then((db) =>	db.collection('products').updateOne({
      _id: ObjectId(id) }, { $set: { name, quantity }
    })
      .then((result) => ({ _id: result.insertedId, name, quantity }))
    );

  if (!result) return null;

  return result;
};

const exclude = async (id) => {
  return await connection().then((db) => db.collection('products').deleteOne(
    { _id: ObjectId(id) }));
};


module.exports = {
  getAll,
  getById,
  findByName,
  create,
  update,
  exclude,
};