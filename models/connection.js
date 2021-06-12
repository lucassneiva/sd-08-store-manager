const { MongoClient } = require('mongodb');
const { URL_MONGO_DATABASE, NAME_OF_DATABASE, OPTIONS } = require('../common/defs');

const connection = () => {
  return MongoClient.connect(URL_MONGO_DATABASE, OPTIONS)
    .then((conn) => console.log('Connected to the MongoDB.') || conn.db(NAME_OF_DATABASE))
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = connection;
