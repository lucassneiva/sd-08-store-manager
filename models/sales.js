const connection = require('./connection');
const { ObjectId } = require('mongodb');

const tryCatch = (callback) =>
  async (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      console.log(error.message);
      return process.exit(1);
    }
  };

const registerSale = tryCatch(async (sale) => {
  const db = await connection();

  const { insertedId } = await db.collection('sales').insertOne({itensSold: sale});

  return { _id: insertedId, itensSold: sale };
});

module.exports = {
  registerSale
};
