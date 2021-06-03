const read = require('../models/read');
const HTTP_OK_STATUS = 200;
const readSales = async (_req, res, next) => {
  let result = {};
  result = await read.getAll('sales');
  // console.log(result);
  res.status(HTTP_OK_STATUS).json({sales: result});
  next();
};
module.exports = readSales;