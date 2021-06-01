const mongoConnection = require('./mongoConnection');

const findByName = async (productName) => {
  const productData = await mongoConnection()
    .then((db) => db.collection('products').findOne({ name: productName }))
    .catch((err) => {
      console.error(err);
    });
  
  if (productData) return true;

  return false;
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection()
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
  findByName,
};
