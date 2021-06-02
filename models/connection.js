const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Remote tests:
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

//Local tests:
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = async () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      });
};


module.exports = connection;
