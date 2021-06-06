const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async() => await connection().then(
  (db) => db.collection('sales').find().toArray());

const findById = async(id) => await connection().then(
  (db) => db.collection('sales').findOne(ObjectId(id)));

const register = async(sale) => {
  const { insertedId } = await connection().then(
    (db) => db.collection('sales').insertOne({ itensSold: sale } ));

  return {
    _id: insertedId,
    itensSold: sale
  };
};

module.exports = {
  getAll,
  findById,
  register,
};
