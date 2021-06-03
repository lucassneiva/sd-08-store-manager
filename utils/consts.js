const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const DEFAULT_PORT = 3000;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const MIN_LENGTH = 5;
const MIN_QUANTITY = 0;
const STATUS_422 = 422;
const STATUS_400 = 400;
const STATUS_200 = 200;
const STATUS_201 = 201;

module.exports = {
  MONGO_DB_URL,
  DB_NAME,
  DEFAULT_PORT,
  OPTIONS,
  MIN_LENGTH,
  MIN_QUANTITY,
  STATUS_422,
  STATUS_400,
  STATUS_200,
  STATUS_201,
};
