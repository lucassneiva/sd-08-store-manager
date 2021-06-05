const rescue = require('express-rescue');

module.exports = async (error, _req, res, _next) => {
  if (error.err && error.status) {
    return res.status(error.status).json({ err: error.err });
  }
  const code_default = 500;
  return res.status(error.status || code_default).json({
    err:{
      code: 'notFound',
      message: 'Unknown error'
    }
  });
};

