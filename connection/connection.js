const { MongoClient } = require('mongodb');

// URL PARA TESTAR LOCALMENTE O PROJETO
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// URL PARA RODAR OS TESTES DO REPOSITÓRIO
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const connection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection.db(DB_NAME);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

module.exports = connection;