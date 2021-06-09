const { ObjectId } = require('mongodb');
const conn = require('./conn');

const getAll = async() => { 
  
  const products = await conn().then( db => db.collection('products').find().toArray());
  console.log(products);
  return products;
      
    
};  




const getbyname = async(name) => {
  return conn().then(db => db.collection('products').countDocuments({name}));
  
};

const getbyid = async(id) => {
  return conn().then(db => db.collection('products').findOne(ObjectId(id)));
  
};



const insertProduct = async(name, quantity) => 
  conn().then(
    async (db) => 
    {
      const result = await db.collection('products').insertOne({ name, quantity });
      return (result);
    }

  );
;

  
const deleteProduct = async(id) => 
  
  conn().then(
    async (db) => 
    {
      const result = await db.collection('products').deleteOne(
        { '_id' : ObjectId(id) });
      return result.deleted;
    }

  );




module.exports = {
  getAll,
  insertProduct,
  deleteProduct,
  getbyname,
  getbyid,
};