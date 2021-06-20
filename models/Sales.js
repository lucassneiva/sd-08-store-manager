const connection = require('./connection');

const createSale = async (itensSold) => {
 
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return { _id: insertedId, itensSold };
};

module.exports={
  createSale
};