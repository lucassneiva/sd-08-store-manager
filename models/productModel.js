const { ObjectId } = require('mongodb');
const conn = require('./conn');

const getAll = async() => {
  return conn().then(db => db.collection('products').find().toArray());
  
};

const insertProduct = async(name, quantity) => 
  
  conn().then(
    async (db) => 
    {
      const result = await db.collection('products').insertOne({ name, quantity });
      return result.ops[0];
    }

  );
  
const deleteProduct = async(id) => 
  
  conn().then(
    async (db) => 
    {
      const result = await db.collection('products').deleteOne(
        { '_id' : ObjectId(id) });
      return result;
    }

  );




module.exports = {
  getAll,
  insertProduct,
  deleteProduct,
};