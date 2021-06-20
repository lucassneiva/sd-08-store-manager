const Sales = require('../models/Sales');
const Products = require('../models/Products');

const {UNPROCESSABLE_ENTITY}=require('./variableStatus');

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

module.exports = {
  createSale
};