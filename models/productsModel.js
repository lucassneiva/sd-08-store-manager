const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create({name, quantity}) {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: insertedId,
  };
}

async function getByName(name) {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  if(!product) return false;

  return product;
}


async function getAll() {
  let db = await connection();
  db = await db.collection('products').find().toArray();
  return db;
}

async function getById(id) {
  ObjectId(id);
  const db = await connection();
  const product = await db.collection('products').findOne({_id: ObjectId(id)});
  return product;
}

async function update(id, name, quantity) {
  ObjectId(id);
  const db = await connection();
  const product = db.collection('products')
    .findOneAndUpdate({_id: ObjectId(id)}, {$set: { name, quantity }},
      { returnOriginal: false});

  return product;
}

async function exclude(id) {
  ObjectId(id);
  let db = await connection();
  const product = db.collection('products').findOneAndDelete({_id: ObjectId(id)});
  return product;
}


module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  exclude
};
