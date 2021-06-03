const connection = require('./connection');
const {ObjectId} = require('mongodb');
const deleteOne = async (id , collection ) => {
  console.log('Delete 1');
  const result = await  connection()
    .then((db) =>  db.collection(collection).deleteOne({_id: ObjectId(id)}));
  if (!result) return null;
  console.log('Delete 2');
  console.log(result.deletedCount);
  return ;
};

module.exports = deleteOne;