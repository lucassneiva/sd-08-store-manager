const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'products';

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection(COLLECTION_NAME));
  
  const { insertedID: _id } = await productsCollection
    .insertOne({ name, quantity });
  
  return {
    _id,
    name,
    quantity
  };
};

const read = async () => {
  const products = await connection().then((db) => {
    return db
      .collection(COLLECTION_NAME)
      .find().toArray();
  });
  return products;
};

const readById = async (id) => 
  connection()
    .then((db) => db
      .collection(COLLECTION_NAME)
      .findOne(new ObjectId(id)))
    .catch(console.log);

const update = async ( name, quantity ) => {
  const product = await connection()
    .then((db) => db
      .collection(COLLECTION_NAME))
    .updateOne(
      new ObjectId(id),
      {
        $set: {
          name, quantity
        }
      }
    );
};

module.exports = {
  create,
  read,
  readById,
  update,
};

