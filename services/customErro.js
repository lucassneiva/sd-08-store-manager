// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error
function customError(errCode, errMessage, code) {
  this.message = {
    err:
    {
      'code': errCode,
      'message': errMessage
    }
  };
  this.stack = Error().stack;
  this.code = code;
}

customError.prototype = Object.create(Error.prototype);
customError.prototype.constructor = customError;

module.exports = customError;
