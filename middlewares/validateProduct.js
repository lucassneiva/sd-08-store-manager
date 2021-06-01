const UNPROCESSABLE_ENTITY = 422;
const FIVE_LENGTH = 5;
const ONE = 1;

const validateProduct = (req, res) => {
  const { name, quantity } = req.body;

  if (name.length < FIVE_LENGTH) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if (typeof quantity === 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  if (quantity < ONE) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
};

module.exports = validateProduct;
