const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        }
      });
  }
  if (quantity <= ZERO) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        }
      });
  }
  next();
};

module.exports = quantityValidation;
