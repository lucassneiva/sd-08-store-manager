const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insert = async (itensSold) =>
  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const findByProductId = async (newProductId) =>
  await connection()
    .then((db) => db.collection('sales').findOne({ productId: newProductId }))
    .then(response => response)
    .catch(err => console.log(err));

const findById = async (id) =>
  await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)))
    .then(response => response)
    .catch(err => console.log(err));

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('sales').find().toArray();
  } catch (error) {
    return null;
  }
};

const updateByID = async (id, itensSold) =>{
  try {
    const db = await connection();
    return await db.collection('sales')
      .updateOne(
        { '_id': ObjectId(id) },
        { $set: { 'itensSold': itensSold },
        });
  } catch (error) {
    return null;
  }
};

const deleteByID = async (id) =>{
  try {
    const db = await connection();
    return await db.collection('sales')
      .deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAll,
  insert,
  findByProductId,
  findById,
  updateByID,
  deleteByID
};
