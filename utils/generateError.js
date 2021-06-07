const HTTP = require('./httpStatusCodes');

module.exports = (message, status = HTTP.UNPROCESSABLE) => {
  let code;

  /* prettier-ignore */
  switch (status) {
  case HTTP.UNPROCESSABLE:
    code = 'invalid_data';
  }

  return { status, result: { err: { code, message } } };
};
