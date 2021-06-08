const QDD = 422;
const QOQ = 404;

const middlewareError = (err, _req, res, _next) => {
  if (err.status === QDD) {
    return res.status(QDD)
      .json({ err: { code: 'invalid_data', message: err.message } });
  }
  if (err.status === QOQ) {
    return res.status(QOQ)
      .json({ err: { code: 'not_found', message: err.message } });
  }
};

module.exports = middlewareError;
