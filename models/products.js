const connection = require('./connection');
const { ObjectId } = require('mongodb');

// const findById = (collection, id) => collection.find({id});
// const createOne = async (name, quantity) => connection
//   .then((db) => db.collection('products').insertOne({name, quantity}))
//   .then(result => findById(result, result.insertedId));

const tryCreate = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const createOne = tryCreate(async (product) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne(product);
  return { _id: insertedId, ...product };
});

const getProduct = tryCreate(async (product) => {
  // if (!ObjectId.isValid(id)) return false;
  const db = await connection();

  const {name} = product;
  const result = await db.collection('products').findOne({name: name});
  return result;
});
module.exports = {
  createOne,
  getProduct
};
