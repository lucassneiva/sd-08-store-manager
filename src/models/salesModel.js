const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray())
    .then((sales) => ({ sales }));
};


const create = async (items) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: items }))
  .then((result) => (result.ops[0]));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection()
    .then((db) => db.collection('sales')
      .findOne(new ObjectId(id)));

  if (!result) return null;
  return result;

};

module.exports = {
  getAll,
  create,
  getById,
};
