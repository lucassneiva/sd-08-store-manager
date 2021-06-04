const {
  responseStatus: { HTTP_INTERNAL_SERVER_ERROR_STATUS },
} = require('../config/constant');

function HandleCustomerError(message, code = 'invalid_data') {
  this.name = 'HandleCustomerError';
  this.code = code;
  this.message = message || '';
  this.stack = new Error().stack;
  return {
    getMessageError: () => ({
      err: {
        code: this.code,
        message: this.message,
      },
    }),
  };
}

HandleCustomerError.prototype = Object.create(HandleCustomerError.prototype);
HandleCustomerError.prototype.constructor = HandleCustomerError;

function logError(err, _req, res, next) {
  console.error(`=>  ${err.message}`);
  res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({ message: 'error in the server' });
  next(err);
}

module.exports = { HandleCustomerError, logError };
