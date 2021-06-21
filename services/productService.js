const STATUS_ERROR_CLIENT = 422;

const productNameCheck = (req, res, next) => {
  const {name} = req.body;
  const nameMin = 5;
  if (name.length < nameMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
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
};

module.exports = {productNameCheck, productQuatityCheck};