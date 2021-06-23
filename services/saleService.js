const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const STATUS_ERROR_CLIENT = 422;

// Req05
const quantityIsValid = async(salesArray) => {
  const quantityMin = 1;
  // const check2 = await salesArray.forEach((el) => console.log(el.quantity));
  const check = await salesArray
    .find((el) => typeof el.quantity !== 'number' || el.quantity < quantityMin);
  return check;
};

const saleQuatityCheck = async(req, res, next) => {
  const salesArray = req.body;
  const quantityCheck = await quantityIsValid(salesArray);
  console.log(quantityCheck);
  if (quantityCheck) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  return next();
};

module.exports = { saleQuatityCheck };