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

const updateSale =async (id, itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectID(id) },
        {$set: {  itensSold }}))
    .then(() => ({ _id: id,  itensSold }));

  return sale;
};

const deleteSale = async (id) => {
  //const saleById = await getById(id);
  const sale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) })
    );
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
