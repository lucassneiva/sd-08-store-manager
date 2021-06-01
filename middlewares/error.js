const INTERNAL_SERVER_ERROR = 500;
module.exports = (error, req, res, next) => {
  const { err } = error;
  if (err)
    return res.status(err.status).json({ err: { code: err.code, message: err.message } });
  res.status(INTERNAL_SERVER_ERROR).json({ message: 'erro no servidor' });
};
