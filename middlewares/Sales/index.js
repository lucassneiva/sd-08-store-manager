const requestValidations = require('./requestValidateMiddleware');
const validateProductId = require('./validateProductIdMiddleware');

module.exports = {
  requestValidations,
  validateProductId,
};
