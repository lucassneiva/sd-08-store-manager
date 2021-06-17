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
  return true;
}


module.exports = {
  create,
  getAll,
  getById
};
