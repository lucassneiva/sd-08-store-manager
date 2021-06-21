const STATUS_ERROR_CLIENT = 422;

const productNameCheck = (req, res, next) => {
  const {name} = req.body;
  const nameMin = 5;
  if (name.length < nameMin) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  return next();
};

module.exports = {productNameCheck};