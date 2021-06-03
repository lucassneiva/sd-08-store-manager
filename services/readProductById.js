const read = require('../models/read');
const validateId = require('./validateId');
const HTTP_OK_STATUS = 200;
const readProductsById = async (id, res, next) => {
  let result = {};
  console.log(id);
  console.log(typeof id);
  result = await validateId(id, res);
  if(result === {} ) { res = result ; next();}
  result = await read.findById('products', id);
  res.status(HTTP_OK_STATUS).json(result);
  next();
};
module.exports = readProductsById;