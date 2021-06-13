const model = require('../models/productsModel');
const { errors, responses } = require('../utilities/errorsNCodes');
const { Products } = errors;
const {
  nameAtLeastFive, nameAlreadyExists,
  quantityMustBeNumber, quantityOneOrMore,
  productDoNotExist } = Products;

const nameMinimumLength = 5;
const minimumQuantity = 1;

const checkNameIsUnique = async (req, res, next) => {
  const { name } = req.body;
  const checkDB = await model.findProductByName(name);
  if (checkDB) {
    return res.status(nameAlreadyExists.response).send(nameAlreadyExists.errorObj);
  }
  next();
};

const checkRequestIsValid = (req, res, next) => {
  const { name, quantity } = req.body;
  if (name.length < nameMinimumLength) {
    return res.status(nameAtLeastFive.response).send(nameAtLeastFive.errorObj);
  }
  if (typeof quantity !== 'number') {
    return res.status(quantityMustBeNumber.response).send(quantityMustBeNumber.errorObj);
  }
  if (quantity < minimumQuantity) {
    return res.status(quantityOneOrMore.response).send(quantityOneOrMore.errorObj);
  }
  next();
};

const productsRequestValidate = (req, res, next) => {
  const checkName = () => checkNameIsUnique(req, res, next);
  checkRequestIsValid(req, res, checkName);
};

const checkIdExists = async (req, res, next) => {
  const idParams = req.params;
  const searching = await model.getProductById(idParams.id);
  if (!searching) {
    return res.status(productDoNotExist.response).send(productDoNotExist.errorObj);
  }
  next();
};

const productsSearchValidate = (req, res, next) => {
  checkIdExists(req, res, next);
};

module.exports = { productsRequestValidate, productsSearchValidate };
