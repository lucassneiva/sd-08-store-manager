const connect = require('../config/mongoDbConnection');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products')
    .findOne(ObjectId(id)));
};

const getByName = async (name) => {
  return connect().then((db) => db.collection('products').findOne({'name': name}));
};
  
const add = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  connect().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return { _id: id, name, quantity };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) })); 
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  update,
  exclude,
};
