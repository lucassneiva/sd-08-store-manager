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

const update = (id, name, quantity) => {
  connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

  return { _id: ObjectId(id), name, quantity };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
