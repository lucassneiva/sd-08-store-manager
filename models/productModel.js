const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, quantity) =>
  connection().then(async (db) => {
    const product = await db
      .collection('products')
      .insertOne({ name: name, quantity: quantity });
    return product.ops[0];
  });

const getAll = async () =>
  connection().then((db) => db
    .collection('products')
    .find()
    .toArray());

const getById = async (id) => {
  await ObjectId.isValid(id);
  const products = connection().then((db) => db
    .collection('products')
    .findOne(ObjectId(id)));
  return products;
};

// const update = async (id, name, quantity) =>
//   connection().then(async (db) =>
//     (await getById(id))
//       ? db
//         .collection('products')
//         .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
//       : add(name, quantity)
//   );

// const exclude = async (id) =>
//   connection().then(async (db) => {
//     const product = await getById(id);
//     db.collection('products').deleteOne({ _id: ObjectId(id) });
//     if (await product) return product;
//   });

module.exports = { add, getAll, getById };
