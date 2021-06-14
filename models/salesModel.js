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
    if (!result) {
      return { error: 'NotFound' };
    }
    return result;
  } catch (err) {
    console.error(`Id ${id} incorrect format\n.`);
    return { error: 'IdIncorrectFormat' };
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
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  updateCreate,
  update,
  remove
};


