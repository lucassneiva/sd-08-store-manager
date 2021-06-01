const connection = require('./connection');
const { ObjectId, MongoError, } = require('mongodb');


const createSales = async (salesArr) =>  {
  const data = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold:[...salesArr]}));
  return data.ops[0];
};

// const findById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }

//   const info = await connection()
//     .then((db) => db.collection('sales').findOne({ _id:  ObjectId(id) }))
//     .then((result)=> result);
//   return info;

// };


// const getAll = async () =>{
//   const data = await connection()
//     .then((db) => db.collection('sales').find().toArray())
//     .then((result) => result);
//   return data;
// };

// const updateSales = async (id,{salesArr}) =>  {
//   const data = await connection()
//     .then((db) => db.collection('sales').
//       findOneAndUpdate({ _id:  ObjectId(id) },
//         {$set:{itensSold:[...salesArr]}},{ returnOriginal: false } ))
//     .then((result) => {
//       return ({
//         _id:result.value._id,
//         itensSold:result.value.itensSold
//       });
//     });
//   return data;
// };

// const deleteSale = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     return null;
//   }
//   const info = await connection()
//     .then((db) => db.collection('sales').deleteOne({ _id:  ObjectId(id) } ))
//     .then((result) => result);
    
//   return info;
// };

module.exports = {
  createSales,
  findById, 
  getAll,
  updateSales,
  deleteSale
};