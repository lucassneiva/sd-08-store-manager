const updateDB = require('../models/update');
const validateName = require('./validatesName');
const validateQuantity = require('./validateQuantity');
const HTTP_OK_STATUS = 200;

const updateProduct = async ( id ,data, res , next)=>{
  const {name , quantity} = data;
  let result = {};
  const nameslist = [];
  result = validateQuantity(quantity, res);
  if(result === {} ) { res = result ; next();}
  result = validateName(name, res, nameslist);
  if(result === {} ) { res = result ; next();}
  result =  await updateDB(id ,'products', {name, quantity});
  res.status(HTTP_OK_STATUS).json(result);
  next();
};
module.exports = updateProduct;