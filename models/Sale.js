const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray())
    .then((sales) => ({ sales }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleID = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!saleID) return null;

  return saleID;
};

const create = async ( items ) => connection()
  .then((db) => db.collection('sales').insertOne( { itensSold: items } ))
  .then((result) => (result.ops[0]));

const update = async ( id, items ) => {
  if (!ObjectId.isValid(id)) return null;

  const updateSale = await connection()
    .then((db) =>	db.collection('sales').updateOne({
      _id: ObjectId(id) }, { $set: { itensSold: items }
    })
      .then((result) => ({ _id: result.insertedId, _id: id, itensSold: items }))
    );

  if (!updateSale) return null;

  return updateSale;
};

// const exclude = async (id) => {
//   return await connection().then(db => db.collection('products').deleteOne(
//     { _id: ObjectId(id) }
//   ));
// };

// const findByName = async (name) => {
//   const productName = await connection()
//     .then((db) => db.collection('products').findOne({ name }));

//   if(!productName) return null;

//   return productName;
// };

module.exports = {
  getAll,
  findById,
  create,
  update,
  //  exclude,
  //  findByName,
};