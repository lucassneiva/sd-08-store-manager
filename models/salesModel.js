const { ObjectID, ObjectId } = require('bson');
const connect = require('./connection');

const addSales = async (itens) => {
  const result = await connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: itens }));
  return {
    _id: result.insertedId,
    itensSold: itens,
  };
};

const getAllSales = async () => {
  const result = await connect()
    .then((db) => db.collection('sales').find().toArray());
  return result;
};

const findByIdSales = async (id) => {
  const result = await connect()
    .then((db) => ObjectID.isValid(id)
      ? db.collection('sales').find({ _id: ObjectID(id) }).toArray()
      : null);
  return result;
};

module.exports = {
  addSales,
  getAllSales,
  findByIdSales,
};
