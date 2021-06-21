const {ObjectId} = require('mongodb');
const connect = require('./connection');

//Req01
const add = async (name, quantity) =>
  connect().then(async(db) => {
    const product = await db.collection('products').insertOne({name, quantity});
    return product.ops[0];
  });

const findByName = async (name) =>
  connect().then(async(db) => {
    const product = await db.collection('products').findOne({'name': name});
    return product;
  });

// Req02
const getAll = async () => 
  connect().then(async(db) => await db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const product = connect()
    .then(async(db) => await db.collection('products').findOne(ObjectId(id)));
  return product;
};

module.exports = {getAll, add, findByName, getById};