const QDD = 422;

const middlewareError = (err, _req, res, _next) => {
  if (err.status === QDD) {
    return res.status(QDD)
      .json({ err: { code: 'invalid_data', message: err.message } });
  }
};

module.exports = middlewareError;
