const ProductsModel = require('../models/ProductsModel');
const { lessThanFive, alreadyExists,
  lessOrEqual, typeMustBe } = require('./errorMessages');

const ZERO = 0;
const FIVE = 5;

const checkIfNameExists = async (name) => {
  const existProduct = await ProductsModel.checkIfNameExists(name);

  if(existProduct.length !== ZERO) return alreadyExists;
};

const validateEntries = (name, quantity) => {
  if(name.length < FIVE) return lessThanFive;
  if(quantity <= ZERO) return lessOrEqual;
  if(typeof(quantity) !== 'number') return typeMustBe;
};

module.exports = {
  checkIfNameExists,
  validateEntries
};
