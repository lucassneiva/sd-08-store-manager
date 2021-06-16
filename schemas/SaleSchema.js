const Joi = require('joi');

const schema = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateSaleMiddleware = (req, res, next) => {
  const code = 422;

  const { error } = schema.validate(req.body);
  if (error) return res.status(code).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  });

  next();
};

module.exports = {
  validateSaleMiddleware,
};
