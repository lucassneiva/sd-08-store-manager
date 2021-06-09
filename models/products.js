const connection = require('./connection');
const { ObjectId } = require('mongodb');

const renameId = ({ _id, ...document }) => ({ id: _id, ...document });

const create = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => {
      return ({ _id: result.insertedId, name, quantity, });
    });

const getAll = async () =>
  await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((db) => db.collection('products').find().toArray())
    .then((produtcs) => produtcs);

const findByName = async (name) => {
  if (!ObjectId.isValid(name)) return null;
  const product =  await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(name)));
  if (!product) return null;
  return product;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product =  await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  if (!product) return null;
  return product;
};

const updateQtyById = async (id, quantity) =>
  await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: ObjectId(id)},
      { $inc: { quantity: quantity, },
      }))
    .then(() => { return ({});
    });

const deleteById = async (id) =>
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then(() => true);

module.esxports = {
  create,
  getAll,
  findById,
  findByName,
  deleteById,
  updateQtyById
};
