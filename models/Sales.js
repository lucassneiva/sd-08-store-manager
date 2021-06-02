const connection = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (itensSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  try {
    const sales = await connection()
      .then((db) => db.collection('sales').findOne(new ObjectId(id)));

    if (!sales) return null;

    return sales;
  } catch (err) {
    return null;
  }
};

const updateById = async (id, updatedSale) => {
  try {
    return connection().then((db) =>
      db.collection('sales')
        .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updatedSale } }),
    );
  } catch (err) {
    return null;
  }
};

const deleteById = async (id) => {
  try {
    const sales = await connection()
      .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
    return sales;
  } catch (err) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
