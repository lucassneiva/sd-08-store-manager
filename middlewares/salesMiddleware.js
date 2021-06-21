const salesSchema = require('../schemas/salesSchema');
const StatusCodes = {
  UNPROCESSABLE_ENTITY: 422,
};

const validateSales = (req, res, next) => {
  const itensSold = req.body;
  const [err] = itensSold.map(({ quantity }) => salesSchema.validate(quantity));

  if (err.message) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    err: { 
      code: 'invalid_data',
      message: err.message
    }
  });

  next();
};

const validateSalesId = (req, res, next) => {
  const { id } = req.params;
  const { message } = salesSchema.validateId(id);

  if (message) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    err: { 
      code: 'invalid_data',
      message
    }
  });

  next();
};

module.exports = { validateSales, validateSalesId };
