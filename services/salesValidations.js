const { errors } = require('../utilities/errorsNCodes');
const { Sales } = errors;
const { saleCantBeLessThanOne, saleQtdCantBeString } = Sales;

const saleMinQtd = 1;

const salesRequestValidate = (req, res, next) => {
  const sellProducts = req.body;
  const checkQtdIsNumber = sellProducts.some(product => product.quantity < saleMinQtd);
  if (checkQtdIsNumber) {
    return res.status(saleCantBeLessThanOne.status).send(saleCantBeLessThanOne.errorObj);
  }
  const checkQtdType = sellProducts.some(product => typeof product.quantity !== 'number');
  if (checkQtdType) {
    return res.status(saleQtdCantBeString.status).send(saleQtdCantBeString.errorObj);
  }
  next();
};

module.exports = { salesRequestValidate };


