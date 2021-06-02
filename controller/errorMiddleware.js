const STATUS_ERRO = 500;

module.exports = (err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ err: { code: err.code, message: err.message } });
  }

  return res.status(STATUS_ERRO).json({ message: 'Erro Generico' });
};