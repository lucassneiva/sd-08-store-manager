const read = require('../models/read');
const HTTP_OK_STATUS = 200;
const readProductsById = async (_req, res, next) => {
  let result = {};
  console.log('leitura');
  result = await read.getAll('products');
  console.log(result);
  res.status(HTTP_OK_STATUS).json({products: result});
  next();
};
module.exports = readProductsById;