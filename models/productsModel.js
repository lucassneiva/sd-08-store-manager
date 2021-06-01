const { ObjectId } = require('mongodb');
const conn = require('../connection');

const addProduct = async({name,quantity})=>
{
  try{
    const products = await conn()
      .then(db=>db.collection('products').findOne( { name: name }));
    if (products) return 'found';
    const {ops} = await conn()
      .then((db) => db.collection('products').insertOne({ name, quantity }));
    const [res]= ops.map(({_id,name,quantity})=>({
      _id,name,quantity
    }));
    return res;
  }catch(err){
    return err;

  }
  /* return (
    conn().then((db) => db.collection('products').insertOne({ name, quantity }))
  ); */
};
const getAll = async()=>{
  return(conn().then(db=>db.collection('products').find().toArray()));
};
const getOne = async(id)=>{
  try{
    const product = await conn().
      then(db=>db.collection('products').findOne( new ObjectId(id)));
    if(!product) return 'null';
    return product;
  }catch(err){
    return null;
  }  
};
const updateOne = async(id,body)=>{
  return conn().
    then(db=>db.collection('products').updateOne({'_id':ObjectId(id)},{$set:body}).toArray());
  
};

module.exports = {
  addProduct,getAll,getOne,updateOne
};