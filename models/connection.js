const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = async () => {
  if (db) return db;
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = await conn.db(DB_NAME);
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
