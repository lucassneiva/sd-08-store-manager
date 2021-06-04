const createDB = require('../models/create');
const validateQuantity = require('./validateQuantity');
const validateId = require('../services/validateIdSync');
const makeSale = require('./makeSaleCreate');
const validateSale = require('../services/validateSale');
const readDB = require('../models/read');
const HTTP_OK_STATUS = 200;
const ERRO = 422;
const ZERO = 0;
const createSales = async (data, res , next)=>{
  let result = {};
  const msgError = {err:
    { code: 'invalid_data', 
      message: 'Wrong product ID or invalid quantity' },};
  console.log('Create Sales  ');
  let idList = await readDB.listByValue('products', '_id');
  idList =idList.map(String);
  console.log(idList);
  const productObject = await readDB.getAll('products');
  console.log(productObject);
  data.forEach(Product =>{
    console.log(res.statusCode);
    console.log('_______________________');
    result =  validateId(Product.productId, res ,msgError);
    result =  validateQuantity(Product.quantity, res ,msgError ,msgError);
    const index = idList.indexOf(Product.productId);
    if(index<ZERO ){
      console.log('___________________SAIU3___________________');
      res = res.status(ERRO).json(msgError);  
      next(); 
      return;
    }
    res = validateSale(Product,index, res, productObject);
  });
  if(res.statusCode!==ERRO){
    result =  await createDB('sales', {itensSold: data});
    await makeSale(data,idList ,productObject);
    console.log('resultado');
    console.log(result);
    console.log(res.statusCode);
    res =  res.status(HTTP_OK_STATUS).json(result[0]);
    console.log('fechando');
  }
  next();
};

module.exports = createSales;