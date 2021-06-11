const { MIN_LENGTH, MIN_QUANTITY } = require('../common/defs');
const { ERROR_TYPES } = require('../common/erroTypes');

module.exports = (req, res, cb) => {
  const { name, quantity } = req.body;
  const { eEmpty, eLength, eZero, eString } = ERROR_TYPES;
  if (name) {
    return res.status(eEmpty.status).json({ err: eEmpty.err });
  }
  if (name.length < MIN_LENGTH) {
    return res.status(eLength.status).json({ err: eLength.err });
  }
  if (quantity <= MIN_QUANTITY) {
    return res.status(eZero.status).json({ err: eZero.err });
  }
  if (typeof quantity !== 'number') {
    return res.status(eString.status).json({ err: eString.err });
  }
  cb();
};
