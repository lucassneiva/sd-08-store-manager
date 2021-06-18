const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  try {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    console.log(products);
    const result = { products: [...products] };
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = { getAll };
