const mongoConnection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const create = async (products) => {
  const salesCollection = await mongoConnection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection
    .insertOne({ itensSold: products});

  return sale.ops[0];
};

const getAll = async () => {
  const salesCollection = await mongoConnection()
    .then((db) => db.collection('sales'));

  const sales = await salesCollection
    .find()
    .toArray();

  return sales;
};

const findById = async (id) => {
  const salesCollection = await mongoConnection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection.findOne(ObjectId(id));
  
  return sale;
};

const update = async (id, newProducts) => {
  const salesCollection = await mongoConnection()
    .then((db) => db.collection('sales'));
  
  await salesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: newProducts } }
  );

  return {
    _id: id,
    itensSold: newProducts,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
