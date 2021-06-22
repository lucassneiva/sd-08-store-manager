const { MongoClient } = require('mongodb');


//Para Avaliador GIT//
//const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';


//Local e Avaliador Local//
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';


const DB_NAME = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME));
  // .catch((err) => {
  //   console.error(err);
  //   process.exit();
  // });
};

module.exports = connection;