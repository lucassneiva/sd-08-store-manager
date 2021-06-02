const connection = require('./connection');
const {ObjectId} = require('mongodb');
const deleteOne = async (id , collection ) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).deleteOne(ObjectId(id)));
  if (!result) return null;
    
  return result;
};

module.exports = {deleteOne};