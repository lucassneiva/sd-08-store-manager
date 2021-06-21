const productModel = require('../models/productModel');

const STATUS_ERROR_CLIENT = 422;

const nameExist = async(name) =>{
  const nameCheck = await productModel.findByName(name);
  console.log(nameCheck);
  return nameCheck;
};

const productNameCheck = async(req, res, next) => {
  const {name} = req.body;
  const nameMin = 5;
  const testnameCheck = await nameExist(name);
  // console.log(testnameCheck);
  if (name.length < nameMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  if (testnameCheck) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        'message': 'Product already exists'
      }
    });
  }
  return next();
};

const productQuatityCheck = (req, res, next) =>{
  const {quantity} = req.body;
  const quantityMin = 1;
  if(typeof quantity !== 'number') {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  if (quantity < quantityMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  return next();
};

module.exports = {productNameCheck, productQuatityCheck};