const connection = require('./connection');
const { ObjectId } = require('mongodb');



const addNewSale = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales')
    .insertOne({ itensSold });
  return result.ops[0];
};



module.exports = {
  addNewSale,
};
