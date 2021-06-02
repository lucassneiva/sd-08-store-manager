const ProductsModel = require('../models/ProductsModel');
const results = {
  shortName: '"name" length must be at least 5 characters long',
  invalidQuantityValue: '"quantity" must be larger than or equal to 1',
  invalidQuantityType: '"quantity" must be a number',
  duplicateProduct: 'Product already exists',
  unprocessable: 422,
};

const generateMessage = (message) => {
  return {
    err: {
      code: 'invalid_data',
      message,
    },
  };
};

exports.fieldsValidation = async (req, res, next) => {
  const { name, quantity } = req.body;
  const minimalLength = 5;
  const minimalQuantity = 0;

  if (name.trim().length < minimalLength) {
    res.status(results.unprocessable).json(generateMessage(results.shortName));
    return;
  }
  if (quantity <= minimalQuantity) {
    res.status(results.unprocessable).json(generateMessage(results.invalidQuantityValue));
    return;
  }
  if (typeof quantity === 'string') {
    res.status(results.unprocessable).json(generateMessage(results.invalidQuantityType));
    return;
  }
  const findResult = await ProductsModel.getByName(name);
  if (findResult) {
    res.status(results.unprocessable).json(generateMessage(results.duplicateProduct));
    return;
  }
  next();
};
