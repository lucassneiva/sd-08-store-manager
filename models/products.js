const connection = require('./connection');

const tryCatch = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error.message);
    return process.exit(1);
  }
};

const createOne = tryCatch(async (product) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne(product);

  return { _id: insertedId, ...product };
});

const getProduct = tryCatch(async (product) => {
  const db = await connection();

  const {name} = product;

  const result = await db.collection('products').findOne({name: name});

  return result;
});

module.exports = {
  createOne,
  getProduct
};
