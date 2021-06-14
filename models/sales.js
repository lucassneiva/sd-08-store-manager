const connection = require('./connection');
const { ObjectId } = require('mongodb');



const addNewSale = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales')
    .insertOne({ itensSold });
  return result.ops[0];
};

const getAllsales = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  console.log(result);
  return result;
  
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('sales').findOne({_id: ObjectId(id)});
};

const updateId = async (id, itensSold) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold }  });
  if (!result) return addNewSale(itensSold);
  return  { _id: id, itensSold };
};

const removeById = async (id) => {
  const db = await connection();
  const result = await db
    .collection('sales').deleteOne({_id: ObjectId(id)});
  return result;
};


module.exports = {
  addNewSale,
  getAllsales,
  getById,
  updateId,
  removeById,
};
