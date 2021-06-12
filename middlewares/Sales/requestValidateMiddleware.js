const { MIN_QUANTITY, ERROR_TYPES} = require('../../utils/consts');

module.exports = (req, res, next) => {
  const {eSaleIdQnt} = ERROR_TYPES;
  const products = req.body;
  const validate = products.map((product) => {
    const { quantity } = product;

    if (quantity <= MIN_QUANTITY) {
      return 'error';
    }

    if (typeof (quantity) !== 'number') {
      return 'error';
    }
  });

  if (validate.find((item) => item === 'error')) {
    return res.status(eSaleIdQnt.status).json({err: eSaleIdQnt.err});
  }
  next();
};

