require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = async () => {
  if (db) return db;
  try {
    const conn = await MongoClient.connect(process.env.MONGO_DB_URL, OPTIONS);
    db = await conn.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
