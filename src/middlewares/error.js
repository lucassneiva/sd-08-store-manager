module.exports = (err, req, res, _next) => {
  const statusByErrorCode = {
    err: {
      code: err.code,
      message: err.error.message
    }
  };
  res.status(err.status).json(statusByErrorCode);
};