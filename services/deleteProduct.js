const deleteDB = require('../models/delete');
const validateId = require('./validateId');
const HTTP_OK_STATUS = 200;

const deleteProduct = async ( id , res , next)=>{
  let result = {};
  result = await validateId(id, res);
  if(result === {} ) { res = result ; next();}
  result =  await deleteDB(id ,'products');
  res.status(HTTP_OK_STATUS).json(result);
  next();
};

module.exports = deleteProduct;