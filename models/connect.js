const mongoDB = require('mongodb').MongoClient;


const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () =>
  mongoDB.connect(MONGO_DB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(connection => connection.db(DB_NAME))
    .catch(err => {
      console.error(err);
      process.exit(1);});

module.exports = connection;
