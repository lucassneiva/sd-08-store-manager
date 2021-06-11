const salesSchema = require('../schemas/salesSchema');


// const UNPROCESSABLE_ENTITY = 422;

const validateSale = (req, res, next) => {
  const itensSold = req.body;
  const validations= salesSchema.validateFields(itensSold);
  if (validations.err) {
    return res.status(validations.code).json({ err: validations.err });
  }
  next();
};

module.exports = {
  validateSale,
};
