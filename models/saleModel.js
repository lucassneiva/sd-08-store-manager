const connection = require('./mongoConnection');
const { ObjectId, ObjectID } = require('mongodb');

const getAll = async () => connection()
  .then(db => db.collection('sales').find().toArray())
  .then((sales) => ({ sales }));

const add = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({itensSold}))
  .then((result) => ({ _id: result.insertedId, itensSold}));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleId = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectID(id)}));

  !saleId && null;

  return saleId;
};

// const update = async ( id, name, quantity ) => {
//   if (!ObjectId.isValid(id)) return null;

//   const product = await connection()
//     .then(
//       (db) =>	db
//         .collection('products')
//         .updateOne({_id: ObjectId(id) }, { $set: { name, quantity }
//         })
//         .then((result) => ({ _id: result.insertedId, name, quantity }))
//     );

//   !product && null;

//   return product;
// };

// const deleteProduct = async (id) => await connection()
//   .then(db => db.collection('products').deleteOne({_id: ObjectId (id)}));

module.exports = {
  getAll,
  add,
  getById,
  // update,
  // deleteProduct,
};
