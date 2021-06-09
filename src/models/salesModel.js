const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray());
};


const create = async ( items ) => connection()
  .then((db) => db.collection('sales').insertOne( { itensSold: items } ))
  .then((result) => (result.ops[0]));

module.exports={
  getAll,
  create,
};
