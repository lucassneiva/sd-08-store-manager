const connection = require('../config/connection');
const { ObjectId, ObjectID } = require('mongodb');

const createSale = async (itemSale) => {
  const sale = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: itemSale }))
    .then(result => result.ops[0]);
  const response = {
    _id: sale._id,
    itensSold: itemSale
  };
  return response;
};

const getAllSales = () => connection()
  .then((db) => db.collection('sales').find().toArray())
  .then((itemSale) => {
    return {sales: itemSale.map(({ _id, itensSold}) => {
      return {
        _id,
        itensSold
      };
    })};
  });

const  getSaleById = async (id) => {
  const product = await connection()
    .then((db) =>  db.collection('sales').findOne(ObjectId(id)));

  return product;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
