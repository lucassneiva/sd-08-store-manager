const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const errors = {
  stock_problem: 404,
};

module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    const errorMessages = err.details.map((detail) => detail.message).join('\n  ');
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errorMessages,
      },
    });
  }

  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    const { message } = payload;
    return statusCode === UNPROCESSABLE_ENTITY
      ? res.status(statusCode).json({
        err: {
          code: 'invalid_data',
          message,
        },
      })
      : res.status(statusCode).json({
        err: {
          code: 'not_found',
          message,
        },
      });
  }

  const statusCode = errors[err.err.code] || INTERNAL_SERVER_ERROR;

  res.status(statusCode).json(err);
};
