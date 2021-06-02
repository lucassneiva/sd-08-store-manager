const ProductsModel = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');
const { results, generateMessage } = require('./ErrorMessage');

exports.name = async (req, res, next) => {
  const { name } = req.body;
  const minimalLength = 5;

  if (name.trim().length < minimalLength) {
    res.status(results.unprocessable).json(generateMessage(results.shortName));
    return;
  }
  next();
};
exports.quantity = async (req, res, next) => {
  const { quantity } = req.body;
  const minimalQuantity = 0;
  if (quantity <= minimalQuantity) {
    res.status(results.unprocessable).json(generateMessage(results.invalidQuantityValue));
    return;
  }
  if (typeof quantity === 'string') {
    res.status(results.unprocessable).json(generateMessage(results.invalidQuantityType));
    return;
  }
  next();
};
exports.duplicate = async (req, res, next) => {
  const { name } = req.body;
  const findResult = await ProductsModel.getByName(name);
  if (findResult) {
    res.status(results.unprocessable).json(generateMessage(results.duplicateProduct));
    return;
  }
  next();
};
exports.productNotFound = async () => {
  return generateMessage(results.invalidId);
};
