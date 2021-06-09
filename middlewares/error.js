const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const error = (err, _req, res, _next) => {

  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  return res.status(err.code || INTERNAL_SERVER_ERROR)
    .json({ err: { code: 'invalid_data', message: err.message } });;

};

module.exports = error;