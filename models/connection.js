const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

module.exports = () => (
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('StoreManager'))
    .then((dbSchema) => dbSchema)
    .catch((err) => {
      // return process.exit(1);
      return err;
    })
);