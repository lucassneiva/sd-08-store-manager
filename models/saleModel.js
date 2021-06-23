const {ObjectId} = require('mongodb');
const connect = require('./connection');

// Req05
const addNewSale = async(itensSold) =>
  connect().then(async(db) => {
    const addSale = await db.collection('sales').insertOne({ itensSold });
    return addSale.ops[0];
  });

// Req06
const getAllSales = async() =>
  connect().then(async(db) => await db.collection('sales').find().toArray());

// Req06
const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const product = connect()
    .then(async(db) => await db.collection('sales').findOne(ObjectId(id)));
  return product;
};

module.exports = { addNewSale, getAllSales, getByIdSale };