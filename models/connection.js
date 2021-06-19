const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let schema = null;

const connection = () => {
  return schema
    ? Promise.resolve(schema)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        schema = conn.db(DB_NAME);
        return schema;
      });
};

module.exports = connection;
