const HTTP = require('./httpStatusCodes');

module.exports = (message, status = HTTP.UNPROCESSABLE, customCode = false) => {
  let code;

  /* prettier-ignore */
  switch (status) {
  case HTTP.UNPROCESSABLE:
    code = 'invalid_data';
    break;
  case HTTP.NOT_FOUND:
    code = 'not_found';
  }

  if (customCode) code = customCode;

  return { status, result: { err: { code, message } } };
};
