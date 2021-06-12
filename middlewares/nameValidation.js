const { hasProduct } = require('../services/productService');

const nameValidation = async (req, res, next) => {
  const { name } = req.body;

  if (!(typeof name === 'string' && name.length >= 5)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at last 5 characters long',
      },
    });
  }

  if (await hasProduct(name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  return next();
};

module.exports = nameValidation;
