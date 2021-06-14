const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (dataForUpdate) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne(dataForUpdate);
  return result;
};

const updateCreate = async (id, sale) => {
  const db = await connection();
  const result = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, {
      $push: {
        itensSold: sale
      }
    }
    );
  return result;
};

const getById = async (id) => {
  const db = await connection();
  try {
    const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

const update = async (id, dataForUpdate) => {
  const db = await connection();
  const result = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: dataForUpdate } });
  return result;
};

const remove = async (id) => {
  const db = await connection();
  const sale = await getById(id);
  if (!sale) return null;
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateCreate,
  update,
  remove
};


