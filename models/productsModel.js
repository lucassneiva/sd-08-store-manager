const connection = require('./connection');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });
  
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
