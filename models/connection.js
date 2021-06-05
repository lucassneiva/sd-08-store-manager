const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// let db = null;

const connection = async () => {
  return MongoClient
    .connect(process.env.DB_URL, OPTIONS)
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
