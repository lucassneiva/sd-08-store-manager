const { HTTP_422_STATUS, HTTP_404_STATUS } = require('./httpStatus');
const { MIN_LENGTH } = require('./defs');

const ERROR_TYPES = {
  eLength: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: `\"name\" length must be at least ${MIN_LENGTH} characters long`,
    },
  },

  eZero: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },

  eString: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },

  eSame: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },

  eId: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },

  eSaleIdQnt: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },

  eSaleId: {
    status: HTTP_404_STATUS,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },

  eDel: {
    status: HTTP_422_STATUS,
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
};

module.exports = {
  ERROR_TYPES,
};
