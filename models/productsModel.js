const connection = require('./connection');

const create = async ({name, quantity}) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId } = await productsCollection
    .insertOne({ name, quantity });
  
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const searchByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  return await productsCollection.findOne({name: name});
};

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const allProducts = await productsCollection
    .find();

  console.log(products);
};

module.exports = {
  create,
  searchByName,
  getAll,
};
