const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

module.exports.connectionDb = async (url = MONGO_DB_URL, dbName = 'StoreManager') => {
  try {
    if (typeof url !== 'string' || typeof dbName !== 'string') {
      throw new Error('URL NÃO É UMA STRING!!!');
    }
    const conn = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dbSchema = conn.db(dbName);
    return dbSchema;
  } catch (err) {
    return err.message;
  }
};
