const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; //rodar avaliator
//const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; //rodar local

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connect) => {
      db = connect.db(DB_NAME);
      return db;
    });
};


module.exports = connection;
