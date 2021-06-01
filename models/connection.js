const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const db = null;

const connection = () => (
  db ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((conn) => conn.db(DB_NAME))
      .catch((err) => console.error(err))
);

module.exports = connection;
