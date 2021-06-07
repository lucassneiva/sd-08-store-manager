const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (salesMade) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId } = await salesCollection
    .insertOne({itensSold: [...salesMade]});

  return {
    _id: insertedId,
    itensSold: [...salesMade]
  };
};

const getAll = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const allSales = await salesCollection
    .find({}).toArray();

  return allSales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection
    .findOne(new ObjectId(id));

  if (!sale) return null;

  return sale;
};

const updateById = async (id, changes) => {
  if (!ObjectId.isValid(id)) return false;

  const newId = new ObjectId(id);
  const newData = changes;

  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const updated = await salesCollection
    .findOneAndUpdate(
      { _id: newId },
      { $set: { itensSold: newData } },
      { returnOriginal: false }
    );

  return updated.value;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
