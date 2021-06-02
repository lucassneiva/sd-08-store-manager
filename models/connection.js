const { MongoClient } = require('mongodb');
const { MONGO_DB_URL, DB_NAME, OPTIONS } = require('../utils/consts');

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => console.log('MongoDB connected...') || conn.db(DB_NAME))
    .catch ((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = connection;
