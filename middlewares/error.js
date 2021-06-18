const { UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR } = require('../services/variableErrors');

const error = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data',message: err.details[0].message } });
  }
  return res.status(err.code || INTERNAL_SERVER_ERROR)
    .json({ err: { code: 'invalid_data', message: err.message } });;

};

module.exports = {
  error,
};