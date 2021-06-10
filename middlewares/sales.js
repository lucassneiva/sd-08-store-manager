const status_422 = 422;

const isValidQuantity = (quantity) => {
  const size = 1;
  if (quantity >= size && typeof quantity === 'number') {
    return true;
  }
  return false;
};

const validateQuantity = (req, res, next) => {
  const bodySales = req.body;
  const validQuantity = bodySales.map(quantity =>isValidQuantity(quantity.quantity));
  if (validQuantity.includes(false)) {
    return res.status(status_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

module.exports = {
  validateQuantity
};
