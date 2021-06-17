const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create(data) {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne( { itensSold: data } );

  console.log('model');
  return sale;
}


async function getAll() {
  const db = await connection();
  const sales = db.collection('sales').find().toArray();
  return sales;
}

async function getById(id) {
  ObjectId(id);
  const db = await connection();
  const sale = db.collection('sales').findOne({_id: ObjectId(id)});
  return sale;
}


module.exports = {
  create,
  getAll,
  getById
};
