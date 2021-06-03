const connection = require('./connection');
const {ObjectId} = require('mongodb');
const deleteOne = async (id , collection ) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).deleteOne({_id: ObjectId(id)}));
  if (!result) return null;
  console.log(result);
  return ;
};

module.exports = deleteOne;