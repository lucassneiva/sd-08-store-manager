const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

//const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let connection;

const getConnection = async (collectionName) => {
  connection = connection ||
    (await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;
