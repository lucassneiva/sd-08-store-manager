const connection = require('./connection');
const { ObjectId } = require('bson');

const getAll = async() => await connection().then(
  (db) => db.collection('products').find().toArray());

const findById = async(id) => await connection().then(
  (db) => db.collection('products').findOne(ObjectId(id)));

const create = async(name, quantity) => {
  const { insertedId } = await connection().then(
    (db) => db.collection('products').insertOne({ name, quantity } ));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const update = async(id, name, quantity) => {
  await connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

  return { _id: ObjectId(id), name, quantity };
};

const remove = async(id) => await connection().then(
  (db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};
