const createDB = require('../models/create');
const validateName = require('./validatesName');
const validateQuantity = require('./validateQuantity');
const readDB = require('../models/read');
const HTTP_OK_STATUS = 201;

const createProduct = async (name , quantity, res , next)=>{
  let result = {};
  
  const nameslist = await readDB.listByValue('products', 'name');
  if(result === {} ) { res = result ; next();}
  result = validateQuantity(quantity, res);
  result = validateName(name, res, nameslist);
  if(result === {} ) { res = result ; next();}
  result =  await createDB('products', {name, quantity});
  res.status(HTTP_OK_STATUS).json(result[0]);
  next();
};

module.exports = createProduct;