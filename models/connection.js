const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  return MongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

module.exports = connection;
