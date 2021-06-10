module.exports = (err, _req, res, _next) => {
  console.log(err);
  const statusError = {
    err: {
      code: err.code,
      message: err.error.message
    }
  };
  res.status(err.status).json(statusError);
};