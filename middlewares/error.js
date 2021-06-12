const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 404;

const error = (err, _req, res, _next) => {

  const statusByErrorCode = {
    invalid_data: UNPROCESSABLE_ENTITY,
    not_found: NOT_FOUND,
    stock_problem: NOT_FOUND
  };

  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: err.details[0].message
        }
      });
  }

  return res.status(statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR)
    .json({ err: { code: err.code, message: err.message } });;
};

module.exports = error;
