const { results, generateMessage } = require('../services/ErrorMessage');
exports.salesNotNull = async (req, res, next) => {
  const minimalQuantity = 0;
  const invalid = req.body.filter(
    (item) => item.quantity <= minimalQuantity || typeof item.quantity === 'string',
  );
  if (invalid.length > minimalQuantity) {
    res.status(results.unprocessable).json(generateMessage(results.salesNotNull));
    return;
  }
  next();
};

