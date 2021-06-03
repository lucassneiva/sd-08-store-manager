const DB_NAME = 'StoreManager';

const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* conection local */
/* const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; */

/* conection remote */
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      });
};

module.exports = connection;

