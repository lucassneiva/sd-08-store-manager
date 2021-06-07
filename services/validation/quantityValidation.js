const generateError = require('../../utils/generateError');

module.exports = (quantity) => {
  if (typeof quantity !== 'number') {
    throw generateError('"quantity" must be a number');
  }

  if (quantity < 1) {
    throw generateError('"quantity" must be larger than or equal to 1');
  }
};
