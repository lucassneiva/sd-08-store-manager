const connection = require('./connection');

const create = async (newProduct) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('products').insertOne(newProduct);
  return {
    _id: insertedId,
    ...newProduct,
  };
};

const findByName = async (name) => {
  const conn = await connection();
  const result = await conn.collection('products').findOne({ name });
  return result;
};

module.exports = {
  create,
  findByName,
};
