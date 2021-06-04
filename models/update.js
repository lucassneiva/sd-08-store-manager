const connection = require('./connection');
const {ObjectId} = require('mongodb');
const updateOne = async (id , collection ,data) => {
  const result = await  connection()
    .then((db) =>  db.collection(collection).updateOne({_id: ObjectId(id)},
      {$set: {...data}},
      {upsert: true},
    ));
  if (!result) return null;
 
  return {_id: id, ...data};
};

module.exports = updateOne;