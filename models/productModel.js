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

module.exports = {getAll, add};

