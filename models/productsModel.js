const connection = require('./connection');
// const { ObjectId } = require('mongod');

const createProduct = async ({ name, quantity }) => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => ({ _id: result.insertedId, name, quantity }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getProductByName = async (itemName) => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').findOne({ name: itemName }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = {
  createProduct,
  getProductByName,
};
