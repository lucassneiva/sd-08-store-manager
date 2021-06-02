const { ObjectID, ObjectId } = require('bson');
const connect = require('./connection');
const ZERO = 0;

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

  if (result.length === ZERO) return null;
  
  return result;
};

const updateSales = async (id, data) => {
  const result = await connect()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectID(id) },
      { $set:  { itensSold: data } }))
    .then(() => ({ _id: id, itensSold: data }));
  return result;
};

const deleteSales = async (id) => {
  const result = await connect()
    .then((db) => ObjectID.isValid(id)
      ? db.collection('sales').findOneAndDelete({ _id: ObjectID(id) })
      : false );
  return result;
};

module.exports = {
  addSales,
  getAllSales,
  findByIdSales,
  updateSales,
  deleteSales
};
