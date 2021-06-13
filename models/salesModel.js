const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async(dataForUpdate) =>{
  const db = await connection();
  const result = await db.collection('sales').insertOne(dataForUpdate);
  return result;
};

const update = async(id, sale) =>{
  const db = await connection();
  const result = await db.collection('sales')
    .updateOne({_id: ObjectId(id)}, {
      $push: {
        itensSold:  sale }
    }
    );
  return result;
};

const getById = async (id) => {
  const db = await connection();
  try {
    const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    console.error(`Id ${id} not found \n.`, err);
    return { error: true };
  }
};

const getAll = async() =>{
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

//create('arroz', 10).then(console.log);
//getAll().then(console.log);


module.exports = {
  create, 
  getAll,
  getById,
  update
};