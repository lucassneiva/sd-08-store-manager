const status = require('../../constants/statusCode');
const validateQuantity = (quantity) => {
  const MIN_SIZE = 1;
  if ( quantity >= MIN_SIZE &&  typeof quantity === 'number'){
    return true;
  };
  return false;
};

const getQuantity = (req, res, next) => {
  const sale = req.body;
  const IsValidQuantity = sale.map((item) => validateQuantity(item.quantity));
  
  if (IsValidQuantity.includes(false)) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

module.exports = { getQuantity };
