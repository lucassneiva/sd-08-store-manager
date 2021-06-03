const { ObjectId } = require('mongodb');
const connection = require('../connection');


const add = async (sale) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection('sales')
      .insertOne({ itensSold: [...sale] });
    return insertedId;
  } catch (err) {
    return null;
  }
};

const getAll = async () => {
  
  const products = connection().then(db=>db.collection('sales').find().toArray());
    
  return products;


};

const getById = async (id) => {
  try {
    const sales = await connection()
      .then((db) => db.collection('sales').findOne(new ObjectId(id)));

    if (!sales) return null;

    return sales;
  } catch (err) {
    return null;
  }
};

const updateOne = async(id,data)=>{
  try{
    await connection().then(db=>db.collection('sales').update({_id:ObjectId(id)},data));
    return true;
  }catch(err){
    return null;
  }
};

const deleteOne = async(id)=>{
  try{
    const sale = await connection()
      .then(db=>db.collection('sales')
        .findOne({_id:ObjectId(id)})); 
    await connection().then(db=>db.collection('sales').deleteOne({_id:ObjectId(id)}));
    return sale;

  }catch(err){
    return null;

  }
};
 



module.exports = {
  getById,getAll,add,updateOne,deleteOne
};