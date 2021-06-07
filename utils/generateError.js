const HTTP = require('./httpStatusCodes');

module.exports = (message, status = HTTP.UNPROCESSABLE) => {
  let code;

  /* prettier-ignore */
  switch (status) {
  case HTTP.UNPROCESSABLE:
    code = 'invalid_data';
    break;
  case HTTP.NOT_FOUND:
    code = 'not_found';
  }

  return { status, result: { err: { code, message } } };
};
