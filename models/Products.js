const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());
  
const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const getById = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!productData) return null;
  return productData;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const update = async (id, product) => connection()
  .then((db) => 
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: product }));

  
const remove = async (id) => await connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));


module.exports = {
  getAll,
  getById,
  findByName,
  create,
  update,
  remove,
};