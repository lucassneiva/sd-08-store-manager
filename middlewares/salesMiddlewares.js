const { isValid, messageError } = require('../schemas/salesSchemas');

const CODE_422 = 422;

const validateSale = (req, res, next) => {
  try {
    const itensSold = req.body;
    isValid(itensSold[0].quantity);
    next();
  } catch (error) {
    const message = messageError(error.message);
    res.status(CODE_422).json(message);
  }
};

module.exports = {
  validateSale,
};
