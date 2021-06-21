const {ObjectId} = require('mongodb');
const connect = require('./connection');

const getAll = async () => 
  connect().then((db)=> db.collection('products').find().toArray());

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

module.exports = {getAll, add, findByName};