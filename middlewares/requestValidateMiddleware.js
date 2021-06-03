const { MIN_LENGTH, MIN_QUANTITY, STATUS_422, STATUS_400 } = require('../utils/consts');

const error = {
  eEmpty: {
    status: STATUS_400,
    err: {
      code: 'invalid_data',
      message: 'product name or quantity can not be empty' },
  },

  eLength: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: `\"name\" length must be at least ${MIN_LENGTH} characters long` },
  },

  eZero: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1' },
  },

  eString: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: '\"quantity\" must be a number' },
  },
};

module.exports = (req, res, next) => {
  const { name, quantity } = req.body;
  const { eEmpty, eLength, eZero, eString } = error;
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

