const connect = require('./mongoConnection');
const { ObjectID, ObjectId } = require('mongodb');

const getAll = async() => 
  await connect()
    .then((db) => 
      db.collection('products')
        .find()
        .toArray());

const add = async (name, quantity) =>
  await connect()
    .then((db) => 
      db.collection('products')
        .insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  await connect()
    .then((db) =>
      ObjectId.isValid(id) ?
        db.collection('products').findOne({ _id: ObjectID(id)})
        : null
    );
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  await connect()
    .then((db) =>
      db
        .collection('products')
        .updateOne({ _id: ObjectID(id)}, {$set: { name, quantity}})
        .then(() => ({ _id: id, name, quantity}))
    );
};

const exclude = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return await connect()
    .then((db) =>
      ObjectId.isValid(id) ?
        db
          .collection('products')
          .deleteOne({ _id: ObjectID(id) })
        :null
    );
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};