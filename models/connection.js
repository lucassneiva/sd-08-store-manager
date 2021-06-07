const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';

// para o avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// para o local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = async () => {
  if (db) return db;
  try {
    const connection = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = await connection.db(DB_NAME);
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
