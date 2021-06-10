const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const getAll = async () =>
  await connection()
    .then((db) => db.collection('sales').find().toArray());

// const findByName = async (name) => {
//   const product =  await connection()
//     .then((db) => db.collection('products').findOne( { 'name': name }));
//   return product;
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection()
//     .then((db) => db.collection('products').findOne(ObjectId(id)));
// };

// const updateById = async (id, updatedProduct) => {
//   const { name, quantity } = updatedProduct;
//   if (!ObjectId.isValid(id)) return null;
//   await connection()
//     .then((db) => db.collection('products').updateOne(
//       {_id: ObjectId(id)},
//       { $set: { name, quantity } }));
//   return { _id: id, name, quantity };
// };

// const deleteById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return await connection()
//     .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
// };

module.exports = {
  create,
  getAll,
  // getById,
  // findByName,
  // deleteById,
  // updateById
};
