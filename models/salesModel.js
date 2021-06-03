const connection = require('../config/connection');

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
module.exports = {
  createSale,
  getAllSales,
};
