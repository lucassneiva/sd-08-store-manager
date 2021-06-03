const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    console.log(err.details);
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
    return res.status(statusCode).json({
      err: {
        code: 'invalid_data',
        message,
      },
    });
  }

  res.status(INTERNAL_SERVER_ERROR).json(err);
};
