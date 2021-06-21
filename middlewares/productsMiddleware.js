const productsSchema = require('../schemas/productsSchema');
// const StatusCodes = {
//   UNPROCESSABLE_ENTITY: 422,
// };

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  const { message } = productsSchema.validate(name, quantity);

  if (message) return res.status(422).json({
    err: { 
      code: 'invalid_data',
      message
    }
  });

  next();
};

const validateProductId = (req, res, next) => {
  const { id } = req.params;
  const { message } = productsSchema.validateId(id);

  if (message) return res.status(422).json({
    err: { 
      code: 'invalid_data',
      message
    }
  });

  next();
};

module.exports = { validateProduct, validateProductId };
