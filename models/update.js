const connection = require('./connection');
const {ObjectId} = require('mongodb');
const updateOne = async (id , collection ,data) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).updateOne(ObjectId(id),data));
  if (!result) return null;
    
  return result;
};

module.exports = {updateOne};