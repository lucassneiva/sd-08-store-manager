const conn = require('./mongoConnection');
const { ObjectID, ObjectId } = require('mongodb');

const getAll = async (table) => conn()
  .then((db) => db.collection(table).find().toArray());

const create = async (table, item) => conn()
  .then((db) => db.collection(table).insertOne(item))
  .then((res) => res.ops[0]);

const readById = async (table, id) => conn()
  .then((db) => ObjectId.isValid(id) 
    ? db.collection(table).findOne({ _id: ObjectID(id) })
    : null
  );

  
const update = async (table, id, item) => {
  if (!ObjectId.isValid(id)) return null;
  return conn()
    .then((db) => db.collection(table).updateOne({ _id: ObjectID(id) }, { $set: item }))
    .then((resp) => ({ _id: resp.insertedId, ...item }));
};
  
const exclude = async (table, id) => {
  if (!ObjectId.isValid(id)) return null;
  return conn()
    .then((db) => ObjectId.isValid(id) 
      ? db.collection(table).deleteOne({ _id: ObjectID(id) })
      : null
    );
};

// ESPECIFIC QUERIES

const checkProductName = async (name) => {
  const product = await conn()
    .then((db) => db.collection('products').findOne({ name }));

  return product ? true : false;
};

module.exports = {
  getAll,
  create,
  readById,
  update,
  exclude,
  checkProductName,
};
