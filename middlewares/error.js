const ERRORS = {
  'invalid_data': 422,
  'not_found': 404,
  'internal_server_error': 500
};

module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(ERRORS.invalid_data).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message 
      }
    });
  }
  
  res.status(ERRORS[err.err.code] || ERRORS.internal_server_error).json(err);
};
