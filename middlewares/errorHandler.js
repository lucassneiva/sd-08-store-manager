module.exports = (err, _req, res, _next) => {
  const { code, message } = err;
  const statusByErrorCode = {
    bad_request: 400,
    unauthenticated: 401,
    payment_required: 402,
    forbidden: 403,
    not_found: 404,
    already_exists: 409,
    unprocessable_entity: 422,
    internal_error: 500,
  };
  const status = statusByErrorCode[code] || statusByErrorCode['internal_error'];

  const resJson = () => {
    switch (code) {
    // case 'not_found':
    //   return { message };
    case 'bad_request':
      return { err: { code, message: 'invalid_data', data: message } };
    case 'unprocessable_entity':
      return { err: { code: 'invalid_data', message } };
    default:
      return { err: { code, message } };
    }
  };

  res.status(status).json(resJson());
};
