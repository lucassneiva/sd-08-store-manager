module.exports = (req, res, next) => {
  const quantity = req.body.quantity;
  const SMALLEST_QUANTITY_ALLOWED = 1;
  const UNPROCESSABLE = 422;

  if (quantity < SMALLEST_QUANTITY_ALLOWED ) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1' 
      }
    });
  }

  if (typeof quantity === 'string') {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number' 
      }
    });
  }
  next();
};
