const Sales = require('../models/Sales');
const Products = require('../models/Products');

const {UNPROCESSABLE_ENTITY,NOT_FOUND}=require('./variableStatus');

const createSale = async(itensSold)=>{
  
  const verifyIds = itensSold.map(({ productId }) => Products.findById(productId));

  const respVerifyIds = await Promise.all(verifyIds);
  const checkVerifyIds = respVerifyIds.includes(null);
 
  if(checkVerifyIds) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  
  return Sales.createSale(itensSold);
};
const findAll = async () =>{
  const AllProdutcs = await Sales.findAll();
  return AllProdutcs;
};
const findById = async (id)=>{
  const selectId = await Sales.findById(id);
  if(!selectId){
    return {
      error:{
        code: NOT_FOUND,
        message: 'Sale not found'
      }
    };
  }
  return selectId;
};


const updateSale = async (products) =>{
  const groupItem = await Sales.updateSale(products);
  return groupItem;
};
module.exports = {
  createSale,
  findAll,
  findById,
  updateSale
};