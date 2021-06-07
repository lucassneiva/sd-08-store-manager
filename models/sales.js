const connect = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (arr) => {
  const salesCollection = await connect()
    .then((db) => db.collection('sales'));

  const { insertedId: _id } = await salesCollection
    .insertOne({ itensSold: arr });

  return {
    _id,
  };
};

const getAll = async () => connect()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => connect()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const update = async (_id, arr) => {
  const salesCollection = await connect()
    .then((db) => db.collection('sales'));
    
  await salesCollection.updateOne({ _id: ObjectId(_id) }, { $set: { itensSold: arr } });
    
  return {
    _id,
  };
};

const erase = async (_id) => {
  const salesCollection = await connect()
    .then((db) => db.collection('sales'));
  
  await salesCollection.deleteOne({ _id: ObjectId(_id) });
  
  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
