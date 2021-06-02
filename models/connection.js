const { MongoClient } = require('mongodb');

// const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
};

module.exports = connection;
