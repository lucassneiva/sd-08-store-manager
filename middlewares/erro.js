const rescue = require('express-rescue');

module.exports = async (error, _req, res, _next) => {
  if (error.err && error.status) {
    return res.status(error.status).json({ err: error.err });
  }
  const code_default = 500;
  // console.log(error);
  return res.status(error.status || code_default).json({
    err:{
      code: 'notFound',
      message: error.message ? error.message : 'Unknown error',
      error: error
    }
  });
};

