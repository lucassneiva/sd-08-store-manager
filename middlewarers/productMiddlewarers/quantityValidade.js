const status = require('../../constants/statusCode');
const validateQuantity = (quantity) => {
  const MIN_SIZE = 1;
  return quantity >= MIN_SIZE;
};


const getQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const IsValidQuantity = validateQuantity(quantity);

  if (typeof quantity !== 'number') {
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (!IsValidQuantity) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};

module.exports = { getQuantity };
