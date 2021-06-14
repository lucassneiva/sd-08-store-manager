const { errors } = require('../utilities/errorsNCodes');
const salesModel = require('../models/salesModel');
const { Sales } = errors;
const { saleAtLeastOne, saleQtdCantBeString, notFoundSale, badRequestSale } = Sales;

const saleMinQtd = 1;

const salesRequestValidate = async (req, res, next) => {
  const saleBody = req.body;
  const qtdMoreThanOne = await saleBody.every(({ quantity }) => quantity >= saleMinQtd);
  if (!qtdMoreThanOne) {
    return res.status(saleAtLeastOne.response).send(saleAtLeastOne.errorObj);
  }
  const typeNumber = await saleBody.every(({ quantity }) => typeof quantity === 'number');
  if (!typeNumber) {
    return res.status(saleQtdCantBeString.response).send(saleQtdCantBeString.errorObj);
  }
  next();
};

const saleIdFound = async (req, res, next) => {
  const idParams = req.params;
  const checkDb = await salesModel.getSaleById(idParams.id);
  if (!checkDb) {
    return res.status(notFoundSale.response).send(notFoundSale.errorObj);
  }
  next();
};

const saleIdRequest = async (req, res, next) => {
  const idParams = req.params;
  const checkDb = await salesModel.getSaleById(idParams.id);
  if (!checkDb) {
    return res.status(badRequestSale.response).send(badRequestSale.errorObj);
  }
  next();
};

module.exports = { salesRequestValidate, saleIdFound, saleIdRequest };


