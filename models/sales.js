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

module.exports = {
  addNewSale,
  getAllsales,
  getById,
};
