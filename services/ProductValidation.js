const ProductsModel = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');
const { results, generateMessage } = require('./ErrorMessage');

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
  console.log(findResult);
  if (findResult) {
    res.status(results.unprocessable).json(generateMessage(results.duplicateProduct));
    return;
  }
  next();
};
exports.productNotFound = async () => {
  return generateMessage(results.invalidId);
};
