const status = require('../../constants/statusCode');
const validateName = (name) => {
  const MIN_LENGTH = 5;
  return name.length >= MIN_LENGTH;
};


const getName = (req, res, next) => {
  const { name } = req.body;
  const IsValidName = validateName(name);
  if (!IsValidName) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      err:{

        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }
  return next();
};

module.exports = { getName };