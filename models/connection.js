// Baseado nos exercicios do bloco 27.1
const { MongoClient } = require('mongodb');

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

// let db = null;
// const connection = () =>
// (db
//   ? Promise.resolve(db)
//   : MongoClient.connect(MONGO_DB_URL, OPTIONS)
//     .then((conn) => {
//       db = conn.db(DB_NAME);
//       return db;
//     }));
const connection = async () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;
