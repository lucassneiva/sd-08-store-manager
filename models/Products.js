const connection = require('./connect');

const formatProduct = ({ _id, name, quantity }) => ({ id: _id, name, quantity });

const add = async (product) => {
  return connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => formatProduct(result.ops[0]));
};

const findProduct = async ({ name }) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return formatProduct(product);
};

// const getAll = async () => {
//   return connection()
//     .then((db) => db.collection('products').find().toArray())
//     .then((res) => console.log(res));
// };

module.exports = {
  add,
  findProduct,
};
