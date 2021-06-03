const read = require('../models/read');
const validateId = require('./validateIdSync');
const HTTP_OK_STATUS = 200;
const ERRO = 404;
const msgError = {err:
  { code: 'not_found', 
    message: 'Sale not found' },};
const readSalesById = async (id, res, next) => {
  let result = {};
  console.log(id);
  console.log(typeof id);
  result = await validateId(id, res ,msgError, ERRO);
  if(res.statusCode!==ERRO){
    let idList = await read.listByValue('sales', '_id');
    console.log(idList);
    idList =idList.map(String);
    console.log(idList);
    if(!idList.includes(id) ){
      res = res.status(ERRO).json(msgError);  
      next(); 
      return;
    }
 
    result = await read.findById('sales', id);
    res.status(HTTP_OK_STATUS).json(result);
  }
  next();
};
module.exports = readSalesById;