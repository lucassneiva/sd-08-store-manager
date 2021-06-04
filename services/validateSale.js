const read = require('../models/read');
const ZERO = 0;
const msgError = {err:
    { code: 'stock_problem', 
      message: 'Such amount is not permitted to sell' },};
const ERRO = 404;
const validateSale =  (Product ,index , res , productObject) => {
  console.log('################## VALIDATE SALES ####################');
  console.log('index: '+index);
  console.log(productObject);
  console.log(productObject[index].quantity);
  console.log(Product.quantity);
  console.log(productObject[index].quantity-Product.quantity);
  if(productObject[index].quantity - Product.quantity<ZERO){
    res = res.status(ERRO).json(msgError);  
  }
  return res;
};
module.exports = validateSale;