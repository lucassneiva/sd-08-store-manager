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

async function update(id, data) {
  ObjectId(id);
  const db = await connection();
  const updatedSale = db.collection('sales')
    .findOneAndUpdate({_id: ObjectId(id)},
      { $set: { itensSold: data } },
      { returnOriginal: false});

  return updatedSale;
}

async function exclude(id) {
  ObjectId(id);
  const db = await connection();
  const deletedSale = db.collection('sales').findOneAndDelete({_id: ObjectId(id)});

  return deletedSale;
}


module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude
};
