const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
const DEFAULT_PORT = 3000;
const MIN_LENGTH = 5;
const MIN_QUANTITY = 0;
const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_400 = 400;
const STATUS_404 = 404;
const STATUS_422 = 422;
const STATUS_500 = 500;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const ERROR_TYPES = {
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

  eSame: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },

  eId: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },

  eSaleIdQnt: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },

  eSaleId: {
    status: STATUS_404,
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },

  eDel: {
    status: STATUS_422,
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
};

module.exports = {
  MONGO_DB_URL,
  DB_NAME,
  DEFAULT_PORT,
  OPTIONS,
  MIN_LENGTH,
  MIN_QUANTITY,
  STATUS_200,
  STATUS_201,
  STATUS_400,
  STATUS_422,
  STATUS_500,
  ERROR_TYPES,
};
