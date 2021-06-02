const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'sales';

const create = async (sale) => {
  const insertedSale = await connection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne(sale));
  
  return insertedSale;
};

const read = async () => connection()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

const readById = async (id) => connection()
  .then((db) => db
    .collection(COLLECTION_NAME)
    .findOne(new ObjectId(id))
  )
  .catch(console.log);

const update = async(id, itensSold) => connection()
  .then((db) => db
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          itensSold
        }
      }
    ));

module.exports = {
  create,
  read,
  readById,
  update,
};