const Joi = require('joi');

// https://stackoverflow.com/questions/53154304/how-to-validate-uniqueness-in-db-via-joi-validate

const MIN_CHARACTERS = 5;

const schema = Joi.object({
  name: Joi.string().min(MIN_CHARACTERS).required(),
  quantity: Joi.number().integer().min(1)
    .message('"quantity" must be larger than or equal to 1').required(),
});

const validateMiddleware = (req, res, next) => {
  const code = 422;

  const { error } = schema.validate(req.body);
  if (error) return res.status(code).json({ err: {
    'code': 'invalid_data',
    'message': error.message,
  } });

  next();
};

module.exports = {
  validateMiddleware,
};
