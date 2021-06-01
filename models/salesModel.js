const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const createSales = async (itens) => {
  try {
    const itensSold = itens;

    const result = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold }))
      .then((result) => ({ _id: result.insertedId, itensSold }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = {
  createSales,
};
