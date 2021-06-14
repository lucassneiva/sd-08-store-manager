const { errors } = require('../utilities/errorsNCodes');
const { Sales } = errors;
const { saleAtLeastOne, saleQtdCantBeString } = Sales;

const saleMinQtd = 1;

const salesRequestValidate = (req, res, next) => {
  const saleBody = req.body;
  const allQtdMoreThanOne = saleBody.every(({ quantity }) => quantity >= saleMinQtd);
  if (!allQtdMoreThanOne) {
    return res.status(saleAtLeastOne.response).send(saleAtLeastOne.errorObj);
  }
  const allQtdTypeNumber = saleBody.every(({ quantity }) => typeof quantity === 'number');
  if (!allQtdTypeNumber) {
    return res.status(saleQtdCantBeString.response).send(saleQtdCantBeString.errorObj);
  }
  next();
};

module.exports = { salesRequestValidate };


