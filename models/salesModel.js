const { ObjectId } = require('mongodb');
const connection = require('../connection');



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



module.exports = {
  getAll,getById
};