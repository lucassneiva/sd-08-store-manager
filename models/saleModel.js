const {ObjectId} = require('mongodb');
const connect = require('./connection');

// Req05
const addNewSale = async(itensSold) =>
  connect().then(async(db) => {
    const addSale = await db.collection('sales').insertOne({ itensSold });
    return addSale.ops[0];
  });

module.exports = {addNewSale};