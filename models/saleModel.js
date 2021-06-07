const connect = require('../config/mongoDbConnection');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));
};

// const getByName = async (name) => {
//   return connect().then((db) => db.collection('products').findOne({'name': name}));
// };
  
const add = async (itensSold) =>
  connect()
    .then((db) => db.collection('sales').insertOne({itensSold}))
    .then((result) => result.ops[0]);

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null; 
  connect().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );
  return { _id: id, itensSold };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) })); 
};

module.exports = {
  getAll,
  getById,
  // getByName,
  add,
  update,
  exclude,
};
