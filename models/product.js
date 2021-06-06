const connection = require('./connection');

const getAllProducts = async () => {
  const dB = await connection();
  const result = await dB.collection('products').find().toArray();
  return result;
};

const addNewProduct = async ({name, quantity}) => {
  const dB = await connection();
  const result = await dB.collection('products').insertOne({name, quantity});
  return {_id: result.insertedId, name, quantity};
};


module.exports = {
  getAllProducts,
  addNewProduct,
};
