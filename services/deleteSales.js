const deleteDB = require('../models/delete');
const validateId = require('./validateIdSync');
const HTTP_OK_STATUS = 200;
const ERRO = 422;
const msgError = {err:
  { code: 'invalid_data', 
    message: 'Wrong sale ID format' },};
const deleteSales = async ( id , res , next)=>{
  let result = {};
  result = await validateId(id, res, msgError);
  if(res.statusCode!==ERRO){
    result =  await deleteDB(id ,'sales');
    res.status(HTTP_OK_STATUS).json(result);
    next();
  }
};

module.exports = deleteSales;