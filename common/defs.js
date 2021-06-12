const URL_MONGO_DATABASE_LOCAL = 'mongodb://127.0.0.1:27017/StoreManager';
const URL_MONGO_DATABASE = 'mongodb://mongodb:27017/StoreManager';
const NAME_OF_DATABASE = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const DEFAULT_PORT = 3000;
const MIN_LENGTH = 5;
const MIN_QUANTITY = 0;

module.exports = {
  URL_MONGO_DATABASE_LOCAL,
  URL_MONGO_DATABASE,
  NAME_OF_DATABASE,
  DEFAULT_PORT,
  OPTIONS,
  MIN_LENGTH,
  MIN_QUANTITY,
};
