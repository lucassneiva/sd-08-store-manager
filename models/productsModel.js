const connection = require('./connection');

const findProductByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: insertedId,
    name,
    quantity
  };
};

module.exports = {
  newProduct,
  findProductByName,
};