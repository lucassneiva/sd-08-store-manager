const { MIN_LENGTH, MIN_QUANTITY, ERROR_TYPES } = require('../utils/consts');

module.exports = (req, res, next) => {
  const { name, quantity } = req.body;
  const { eEmpty, eLength, eZero, eString } = ERROR_TYPES;
  switch(true) {
  case (!name): return res
    .status(eEmpty.status)
    .json({err: eEmpty.err});
  case (name.length < MIN_LENGTH): return res
    .status(eLength.status)
    .json({err: eLength.err});
  case (quantity <= MIN_QUANTITY): return res
    .status(eZero.status)
    .json({err: eZero.err});
  case (typeof (quantity) !== 'number'): return res
    .status(eString.status)
    .json({err: eString.err});
  default: next();
  }
};

