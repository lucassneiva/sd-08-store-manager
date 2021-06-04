const connection = require('./connection');
const { ObjectId } = require('mongodb');

const register = async(itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  const registerSale = { _id: insertedId, itensSold };
  return registerSale;
};

const findAll = async () => {
  const soldProducts = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return soldProducts;
};

const findById = async (id) => {
  const soldProductById = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return soldProductById;
};

const updateById = async (id, itensSold) => {
  const updateSale = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return updateSale;
};

module.exports = {
  register,
  findAll,
  findById,
  updateById,
};
