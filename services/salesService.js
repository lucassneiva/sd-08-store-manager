const salesModel = require('../models/salesModel');

const create = async (productId, quantity)=>{
  const { insertedId } = await salesModel.create(productId, quantity);
  return { _id: insertedId, itensSold: { productId, quantity}};
};

const getAll = ()=>{
  return salesModel.getAll();
};
//create('arroz', 10).then(console.log);
// getAll().then(console.log);

module.exports ={
  create, 
  getAll,
};