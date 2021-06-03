const connection = require('./connection');
const {ObjectId} = require('mongodb');
const getAll = async (collection) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).find().toArray());
  if (!result) return null;
    
  return result;
};
const findById = async ( collection , id) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).findOne(ObjectId(id)));
  if (!result) return null;
    
  return result;
};
const listByValue = async (collection, value) =>{
  const result = await  connection()
    .then((db) =>  db.collection(collection).distinct(value));
  if (!result) return null;
    
  return result;
};
// https://stackoverflow.com/questions/32845280/mongodb-return-array-of-values-into-a-variable
module.exports = {getAll , findById , listByValue};