// const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message 
      }
    });
  }
  res.status(UNPROCESSABLE_ENTITY).json(err);
};
